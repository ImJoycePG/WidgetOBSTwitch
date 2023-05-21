const fileList = require('../../Controllers/fileList');

module.exports = {
    name: 'resetList',
    execute: async (channel, user, text, msg, client, io) => {
        if (msg.userInfo.isMod) {
            client.say(channel, `@${user} eliminó toda la lista.`);
            fileList.removeAllUsersFromList();
        }
        io.emit('resetList');
        const listCount = fileList.getListCount();
        io.emit('getListCount', listCount);
    }
}