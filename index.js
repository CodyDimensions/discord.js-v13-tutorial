const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const fs = require('fs')
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});

module.exports = client;

const config = require('./config.json')
const prefix = config.prefix
const token = config.token


client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)
    
    const actvs = [
        `${prefix}help | Under Development`,
        `${prefix}help | ${client.channels.cache.size} channels`,
        `${prefix}help | ${client.users.cache.size} users`,
        `${prefix}help | ${client.guilds.cache.size} servers`,
    ]

    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'COMPETING' });
        setInterval(() => {
            client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'COMPETING' });
    }, 5000);

    client.user.setStatus('idle')

    
});


client.on('messageCreate', async message => {
    if (message.author.bot) return;
    msg = message.content.toLowerCase();

    if(msg.startsWith (prefix + 'ping')) {
        const msg = await message.channel.send('Pinging...')
            await msg.edit(`Pong! **${client.ws.ping} ms**`)

    }
})

client.on('messageCreate', message => {
    if (message.author.bot) return;
    msg = message.content.toLowerCase();

    if(msg.startsWith (prefix + 'beep')) {
        message.channel.send('Boop!')
    }
})


client.login(token)