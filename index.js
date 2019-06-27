const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NTkzODE0NzUxODkzNzgyNTQx.XRTXYA.K3zPKeHS8LQrl3oFhyt7Y0K0BHI';
const PREFIX = '!';

var version = '1.0';

bot.on('ready', () =>{
    console.log('HypeJester is Now Online!');
    bot.user.setActivity('the servers dumb commands', {type: 'LISTENING'}).catch(console.error);
})

bot.on('message', msg=>{
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'info':
            if(args[1] === 'version'){
                msg.channel.sendMessage('Version: '+version);
            }
            else if(args[1] === 'commands'){
                msg.channel.sendMessage('Current Emote Options:\n!emote sad\n!emote pog\n!emote lmao\n!emote frick\n!emote YES');
            }
            else{
                msg.channel.sendMessage('!version --> Current Bot Version\n!info commands --> Commands List');
            }
            break;
        case 'emote':
            if(args[1] === 'sad'){
                if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
                msg.channel.sendMessage(':( oof');
                break;
            }
            else if(args[1] === 'pog'){
                if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
                msg.channel.sendMessage('sorry fam i aint finished yet ¯\_(ツ)_/¯');
                break;
            }
            else if(args[1] === 'lmao'){
                if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
                msg.channel.sendMessage('lemo');
                break;
            }
            else if(args[1] === 'frick'){
                if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
                msg.channel.sendMessage('error frikin not done yet');
                break;
            }
            else if(args[1] === 'YES'){
                if(!msg.member.roles.find(r => r.name === "Founding Fathers")) return msg.channel.send('u aint got permission bruv periodt.');
                msg.channel.sendMessage('this machine broke');
                break;
            }
            else{
                msg.channel.sendMessage('bro dis aint a command wtf');
                break;
            }  
    }

})

bot.login(token);
