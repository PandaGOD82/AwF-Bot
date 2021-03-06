module.exports = {
  config: {
    name: 'sendcmdall',
    aliases: ['fcommandall'],
    usage: '<factorio server command',
    category: 'factorio',
    description: 'description',
    accessableby: 'Moderators'
  },
  run: async (client, message, args) => {
    let authRoles = message.member.roles.cache

    if (authRoles.some(r => r.name === 'Admin') || authRoles.some(r => r.name === 'Moderator') || authRoles.some(r => r.name === 'dev')) {
      message.content = '/' + message.content;  //prefixes the message with a / to start commands in Factorio
      sendToAll(message, false); //sends the command to all servers with no username
      return message.channel.send('Success!').then(message => message.delete({ timeout: 5000 }));
    }
  }
}