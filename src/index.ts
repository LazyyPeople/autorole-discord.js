import { Intents, Message } from 'discord.js';
import db from './data/index';
import { Bot } from './structures/Client';

const client = new Bot({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const Prefix = '!'; // prefix bot

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message: Message) => {
    if(!message.content.startsWith(Prefix)) return;
    let args = message.content.slice(Prefix.length).split(" ");
    let command = args.shift()?.toLocaleLowerCase() as string;

    try {
        let cmd = require(`./commands/${command}`);
        // cmd
        cmd.run(client, message, args);
    } catch(e) {
        console.log(e);
    }
});

client.on('guildMemberAdd', (member) => {
    let role = client.db.get(`role.${member.guild.id}`);
    if(!role) return;

    let status = client.db.get(`status.${member.guild.id}`);
    if(!status) return;
    member.roles.add(role);
});

client.login('your bot token');
