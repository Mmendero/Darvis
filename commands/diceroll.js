const botSettings = require(`../botSettings.json`);
const Discord = require('discord.js');
const Dice = [4,6,8,10,12,20];


module.exports.run = async(bot, message, args) =>{
    var results = "```css\rROLLS\r";
    

    if (args === undefined || args.length != 1) {
        // array is empty or does not exist = defaults to 1d6
        results += diceroll(results,6);
        results += "```";
        message.channel.send(results);
        
        
    }
    else{       
        if(args[0].substring(0,1) === 'd' && !(Dice.includes(Number(args[0].substring(1,args[0].length)))) ){
            //Error message when dice is inputted with no quantity and incorrect dize size
            message.channel.send("```css\r[Not a valid dice!]\rUse: d4, d6, d8, d10, d12, or d20!\r```");
        }
        else if(args[0].substring(0,1) === 'd' && Dice.includes(Number(args[0].substring(1,args[0].length))) ){
            //runs diceroll when a dice is inputted without a quantity and correct size
            let dice = Number(args[0].substring(1,args[0].length));
            results += diceroll(results,dice);
            results += "```"
            message.channel.send(results);
        }
        else{
            //runs diceroll when a dice is inputted with a quantity
            let quantity = Number(args[0].substring(0,1));
            let dice = Number(args[0].substring(2,args[0].length));
            
            if( (quantity < 1 && quantity > 9) || !(Dice.includes(dice)) ){
                //incorrect quantity or dice size
                message.channel.send("```css\r[Not a valid dice!]\rUse: d4, d6, d8, d10, d12, or d20!\r```");
            }
            else{
                //quantity of 1 or greater with correct dice size
                for(i = 1; i <= quantity; i++){
                    results += diceroll(results,dice);  
                }
                results += "```"
                message.channel.send(results);
            }
        }
        
    }
    
    

    
}    

module.exports.help = {
    name: "diceroll",
    desc: "Rolls dice. Enter (Quantity)d(Dice Size)"
}

function diceroll(result, size){
    //function to determine criticals as well as to add roll to results
    let roll = Math.floor((Math.random() * size) + 1);
    switch(roll){
        case 20:
            return "20 --> \"CRITICAL SUCCESS\"\n";
        case 1: 
            return "1 --> [CRITICAL FAILURE]\n";
        default:
            return roll + "\n";
    }
}