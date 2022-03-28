const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'warn', // name of the command
    description: 'Warn a user for some reason.',
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MEMBERS")) return message.reply({ content: "**You don't have permissions to use this command!**"}) // if the user don't have the manage members permission, then return a message

        let user = message.mentions.members.first() || client.users.cache.get(args[0]); // mention a member to warn or warn the member by their user ID
        let reason = args.slice(1).join(' ') // slice the args 1 and join with space

        if(!user) return message.reply({ content: "Please specify a valid user to warn!" }); // if user didnt specify the member ID or didnt mention that member to warn, then return a message

        let embed = new MessageEmbed() // make a new embed
        .setAuthor({ name: message.author.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${message.author} warned ${user} \n\n Reason: ${reason ? reason : 'No reason provided'}`) // if there is reason provided then show the reason, if not then show 'No reson provided'
        .setTimestamp()
        .setFooter({ text: `${user.tag || user.user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) || user.user.displayAvatarURL({ dynamic: true }) })
        message.reply({ embeds: [embed] }).then(() => {
            db.add(`warns_${user.id}`, 1) // add one warning to the database
            let dm = new MessageEmbed()
            .setDescription(`You were warned by ${message.author} \n\n Reason: ${reason ? reason : 'No reason provided'}`)
            .setTimestamp()
            user.send({ embeds: [embed] }) // send a dm to the user that get warned
        });
    }
};