module.exports = {
    name: 'say',
    description: 'Say a message with the bot.',
    run: async(client, message, args) => {
        let msg;
        let textchannel = message.mentions.channels.first() //find the channel you mention in the cmd
        
        if(!message.member.permissions.has('MANAGE_MESSAGES')) { //need manage messages permission to prevent people use this cmd wrong
            return message.reply({ content: '**You do not have permission to use this command.**' }) //like sending the msg to announcement channel...
        } else if(!args[0]) { // if you did not type what you wanna say, then the bot will return a message to you
            return message.reply({ content: '**Please specify what you want to say!**'})
        }else if(textchannel) { //if you mention the channel you want to send the message
        message.delete()
            msg = args.slice(1).join(' '); // for example: !say #general hello
            client.channels.cache.get(textchannel.id).send({ content: msg }) //then it will send that message to the channel you mention
        }else{
          message.delete()
            msg = args.join(' '); //this code is for getting the message you want to send
            message.channel.send({ content: msg })//then send to your message channel
        }
    }
}
