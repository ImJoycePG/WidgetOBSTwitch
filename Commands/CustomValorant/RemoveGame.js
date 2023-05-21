const fileList = require('../../Controllers/fileList');

module.exports = {
  name: 'removeGame',
  execute: (channel, user, text, msg, client, io) => {
    const args = text.slice(1).split(' ');
    const commandName = args.shift().toLowerCase();
    const usernameToRemove = args[0];

    if (!msg.userInfo.isMod) {
        return;
    }

    if (!usernameToRemove) {
      client.say(channel, `@${user}, debes proporcionar un nombre de usuario para eliminar.`);
      return;
    }

    const lowercaseUsername = usernameToRemove.toLowerCase();

    if (fileList.isUserExisting(lowercaseUsername)) {
      fileList.removeUserFromList(lowercaseUsername);
      client.say(channel, `@${user}, se eliminó a @${usernameToRemove} correctamente.`);
    } else {
      client.say(channel, `@${user}, @${usernameToRemove} no se encuentra en la lista.`);
    }

    io.emit('userDelete', lowercaseUsername);
        const listCount = fileList.getListCount();
        io.emit('getListCount', listCount);
  },
};
