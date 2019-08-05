const botSettings = require(`./botSettings.json`);
const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");

const PREFIX = botSettings.PREFIX;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir(`./commands/`, (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`); 
    jsfiles.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "meRsli31:",
    database: "testo"
});

con.connect(err => {
    if(err) throw err;
    console.log("Connected to database!");
    con.query("SHOW TABLES", console.log);
});

bot.on('ready', () =>{
    console.log('Darvis is Now Online!');
    console.log(bot.commands);
    bot.user.setActivity('the servers dumb commands', {type: 'LISTENING'}).catch(console.error);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(PREFIX)) return;

    let cmd = bot.commands.get(command.slice(PREFIX.length));
    if(cmd) cmd.run(bot, message, args, con);


});

bot.login(botSettings.token);
