const botSettings = require(`../botSettings.json`);
const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
    let embed = new Discord.RichEmbed()
    if(args[0] === "commands"){
        embed.setTitle('COMMAND LIST')
            .setColor('LUMINOUS_VIVID_PINK')
        bot.commands.forEach((command) =>{
            embed.addField(botSettings.PREFIX + command.help.name , command.help.desc)
        });
    }
    else{
        embed.setTitle('Bot Information')
            .setDescription("\*For Full List of Commands Type: \'!botinfo commands\'\*")
            .setColor('LUMINOUS_VIVID_PINK')
            .addField("Version", module.exports.help.version)
    }
    

    message.channel.send(embed);
}    

module.exports.help = {
    name: "botinfo",
    version: "1.1",
    desc: "General Info on Bot"
}