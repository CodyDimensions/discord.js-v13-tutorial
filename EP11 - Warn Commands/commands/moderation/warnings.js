const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'warnings',
    desscription: 'Display the number of warnings of a user.',
    run: async (client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MEMBERS")) return message.reply({ content: "**You don't have permissions to use this command!**"}) // if the user don't have the manage members permission, then return a message

        let user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author; // mention a member or the member by their user ID to display their warnings or diplay the warnings of yourself
        let warns = await db.fetch(`warns_${user.id}`) // fetch the warnings of the user in db
        if(warns == null) warns = 0; // if db is null then warns variable equals to 0

        let embed = new MessageEmbed()
        .setTitle(`Warnings of ${user.tag || user.user.tag}`)
        .setDescription(`Warn(s) - ${warns}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }) || user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        message.reply({ embeds: [embed] })
    }
}