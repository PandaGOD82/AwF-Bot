const functions = require('./functions');
const { filterBan } = require("./filterBan");

module.exports = function chatFormat(line, channel, client) {
  const helpdesk = client.channels.cache.get('590241134740111387')

  if (line.includes('?griefer')) {
    //mentions 548545406653431810 (Admin) and 555824650324672522 (Moderator)
    helpdesk.send(`<@&548545406653431810> <@&555824650324672522>! Griefer on ${client.channels.cache.get(channel)}`);
  }
  if (line.includes('[JOIN]')) {
    filterBan(line.slice((line.indexOf(']') + 2), (line.indexOf('joined the game') - 1)));
  }
  if (line.includes('<server>')) return
  if (line.includes('; Factorio')) {
    return client.channels.cache.get(channel).setTopic(`Running ${functions.formatVersion(line)} since ${functions.formatDate(line)}`);
  }
  else if (line.includes('[JOIN]') || line.includes('[LEAVE]') || line.includes('[CHAT]')) {
    if (line.includes('[CHAT]')) {
      return client.channels.cache.get(channel).send(`<Game Chat> ${functions.formatChatData(line)}`);
    } else {
      return client.channels.cache.get(channel).send(`**${functions.formatChatData(line)}**`);
    }
  }
  else if (line.includes('JLOGGER:')) {
    line = line.slice((line.indexOf('JLOGGER:') + 'JLOGGER:'.length + 1))
    let result = functions.parseJammyLogger(line, client.channels.cache.get(channel));  //sends the channel object
    if (typeof (result) === 'object') { //if result is an array, js doesn't differentiate betwee objects and arrays when using typeOf()
      if (result[0] === 'ban')
        return client.channels.cache.get(channel).send(`Command worked, player \`${result[1]}\` has been banned for reason \`${result[2]}\``);
      if (result[0] === 'unban')
        return client.channels.cache.get(channel).send(`Command worked, player \`${result[1]}\` has been unbanned`);
      if (result[0] === 'kick')
        return client.channels.cache.get(channel).send(`Command worked, player \`${result[1]}\` has been kicked for reason \`${result[2]}\``);
      if (result[0] === 'mute')
        return client.channels.cache.get(channel).send(`Command worked, player \`${result[1]}\` has been muted`);
      if (result[0] === 'unmute')
        return client.channels.cache.get(channel).send(`Command worked, player \`${result[1]}\` has been unmuted`);
    }
  }
}
