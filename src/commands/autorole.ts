import { Message } from 'discord.js';
import { Bot } from '../structures/Client';
import { Permissions } from 'discord.js';

export function run(client: Bot, message: Message, args: string[]) {
    if(!message.member?.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply('You do not have permission to use this command.');
    
    if(!['on', 'off', 'set'].includes(args[0])) return message.channel.send("Invalid Type");

    switch(args[0]) {
        case 'on':
            let data = client.db.get(`status.${message.guild?.id}`);
            if(data) return message.channel.send("Already On");
            message.channel.send("Autorole now active!");
            client.db.set(`status.${message.guild?.id}`, true);
            break;
        case 'off':
            let data2 = client.db.get(`status.${message.guild?.id}`);
            if(!data2) return message.channel.send("Already Off");
            message.channel.send("Autorole now inactive!");
            client.db.set(`status.${message.guild?.id}`, false);
            break;
        case 'set':
            let role = message.mentions.roles.first();
            if(!role) return message.channel.send("Invalid Role");

            message.channel.send(`Set role to : ${role.name}`);
            client.db.set(`role.${message.guild?.id}`, role.id);
            break;
    }
}
