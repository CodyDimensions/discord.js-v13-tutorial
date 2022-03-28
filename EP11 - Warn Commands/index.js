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
    
    let guild = client.guilds.cache.get('901840928707313724') // get the server/ guild by ID
    // now, we need to set the channel name to those member counts, or it won't work if no members join of leave
    client.channels.cache.get('945246814481821756').setName(`👥 Total users - ${guild.memberCount}`) // count the toal members and set to the channel name
    client.channels.cache.get('945246860375908403').setName(`👤 Members - ${guild.members.cache.filter(member => !member.user.bot).size}`) // filter out the human in server and get the size
    client.channels.cache.get('945246877669015572').setName(`🤖 Bots - ${guild.members.cache.filter(member => member.user.bot).size}`) // filter out the bots in server and get the size
    // we don't have the member variable here, so we get the guild and set the variable to 'guild'. so it is guild.memberCount ...

    // make a function
    function statusCount() { 
        client.channels.cache.get('945249798871732274') // get the channel by ID, the channel is for out status count
        .setName(`🟢 ${guild.members.cache.filter(m => m.presence?.status == 'online').size} ⛔ ${guild.members.cache.filter(m => m.presence?.status == 'dnd').size} 🌙 ${guild.members.cache.filter(m => m.presence?.status == 'idle').size} ⚫ ${guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`) // This is a very common error, and remember to check your code and make sure there is ?, don't ask me why you got that error, check the code again 😂
        // set the channel name to status counts. Filter the member's online/dnd/idle presence status and get the size. For offline, if the user doesn't have a presence or the presence status is equals to offline, count the size of it.
    } statusCount() // run the function

    setInterval(() => { // run the function every one minutes
        statusCount()
    }, 600000) // don't set the time too low, it won't work sometimes
});



//new collections
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.categories = fs.readdirSync('./commands');

//load the files
['command'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});


//snipe map
client.snipes = new Map() //create a new map
client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, { //get the channel of message
        content: message.content, //snipe the message that was deleted
        author: message.author.id, //get the message author the the deleted message
        image: message.attachments.first() ? message.attachments.first().proxyURL : null //get the deleted image if there is one
    })
})


// when members join the server, the voice channel name of members count will update
client.on('guildMemberAdd', (member) =>{ // when members join server
     // get the voice channels by ID
    client.channels.cache.get('945246814481821756').setName(`👥 Total users - ${member.guild.memberCount}`) // count the toal members and set to the channel name
    client.channels.cache.get('945246860375908403').setName(`👤 Members - ${member.guild.members.cache.filter(member => !member.user.bot).size}`) // filter out the human in server and get the size
    client.channels.cache.get('945246877669015572').setName(`🤖 Bots - ${member.guild.members.cache.filter(member => member.user.bot).size}`) // filter out the bots in server and get the size
})

client.on('guildMemberRemove', (member) =>{ // when members leave server
    // get the voice channels by ID
   client.channels.cache.get('945246814481821756').setName(`👥 Total users - ${member.guild.memberCount}`) // count the toal members and set to the channel name
   client.channels.cache.get('945246860375908403').setName(`👤 Members - ${member.guild.members.cache.filter(member => !member.user.bot).size}`) // filter out the human in server and get the size
   client.channels.cache.get('945246877669015572').setName(`🤖 Bots - ${member.guild.members.cache.filter(member => member.user.bot).size}`) // filter out the bots in server and get the size
})

// when member join the server, it do the member count again. When member leave, it do the membercount again!

client.login(token)