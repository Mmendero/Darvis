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

    console.log(`Loading ${jsfiles.length}" commands!`); 
    jsfiles.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(f,props);
    });
});

bot.on('ready', () =>{
    console.log('HypeJester is Now Online!');
    console.log(bot.commands);
    bot.user.setActivity('the servers dumb commands', {type: 'LISTENING'}).catch(console.error);
});

bot.on

// bot.on('message', msg=>{
//     let args = msg.content.substring(PREFIX.length).split(" ");

//     switch(args[0]){
//         case 'info':
//             if(args[1] === 'version'){
//                 msg.channel.sendMessage('Version: '+version);
//             }
//             else if(args[1] === 'commands'){
//                 msg.channel.sendMessage('Current Emote Options:\n!emote sad\n!emote pog\n!emote lmao\n!emote frick\n!emote YES');
//             }
//             else{
//                 msg.channel.sendMessage('!version --> Current Bot Version\n!info commands --> Commands List');
//             }
//             break;
//         case 'emote':
//             if(args[1] === 'sad'){
//                 if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
//                 msg.channel.sendMessage(':( oof');
//                 break;
//             }
//             else if(args[1] === 'pog'){
//                 if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
//                 msg.channel.sendMessage('sorry fam i aint finished yet ¯\_(ツ)_/¯');
//                 break;
//             }
//             else if(args[1] === 'lmao'){
//                 if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
//                 msg.channel.sendMessage('lemo');
//                 break;
//             }
//             else if(args[1] === 'frick'){
//                 if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
//                 msg.channel.sendMessage('error frikin not done yet');
//                 break;
//             }
//             else if(args[1] === 'YES'){
//                 if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
//                 msg.channel.sendMessage('this machine broke');
//                 break;
//             }
//             else{
//                 msg.channel.sendMessage('bro dis aint a command wtf');
//                 break;
//             }  
//     }

// })

bot.login(botSettings.token);
