const botSettings = require(`./botSettings.json`);
const Discord = require("discord.js");
const fs = require("fs");

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

bot.on('ready', () =>{
    console.log('Darvis is Now Online!');
    console.log(bot.commands);
    bot.user.setActivity('the servers dumb commands', {type: 'LISTENING'}).catch(console.error);
});

