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
    client.user.setActivity(`${prefix}help ~ test`)
});


client.login(token)