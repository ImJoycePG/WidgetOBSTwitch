const fileList = require('../../Controllers/fileList');

module.exports = {
    name: 'leaveGame',
    execute: (channel, user, text, msg, client, io) => {
        if(fileList.isUserExisting(user)){
            fileList.removeUserFromList(user)
            client.say(channel, '@' + user + ' se te removió correctamente.');
        }else{
            fileList.removeUserFromList(user);
            client.say(channel, '@' + user + ' no te encuentras en la lista.');
        }
        io.emit('userDelete', user);
        const listCount = fileList.getListCount();
        io.emit('getListCount', listCount);
    }
}