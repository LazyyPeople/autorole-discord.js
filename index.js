const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!"; // prefix ex: !autorole
const db = require("quick.db");

client.on('ready', () => {
  console.log('Bot Ready!');
});

client.on("message", msg => {
  
  if(!msg.content.startsWith(prefix)) return;
  let args = msg.content.slice(prefix.length).split(" ");
  let cmd = args.shift().toLowerCase();
  
  try {
    let command = require(`./commands/${cmd}`);
    command.run(client, msg, args);
  }catch(e){
    console.log(e);
  }
  
});

client.on('guildMemberAdd', member => {
  
  let data = db.get(`status.${member.guild.id}`);
  
  if(data === true) {
    let role = member.guild.roles.cache.get(db.get(`autorole.${member.guild.id}`));
    member.roles.add(role);
  }
  
});

client.login('YOUR BOT TOKEN');
