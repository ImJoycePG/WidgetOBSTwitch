const fileList = require('../../Controllers/fileList');

module.exports = {
    name: 'JoinGame',
    execute: (channel, user, text, msg, client, io) => {
        if(fileList.isUserExisting(user)){
            if(fileList.hasReachedMaxLimit()){
                client.say(channel, '@' + user + ' ya se encuentra llena la lista. Espera a que haya espacio.');
                return;
            }
            fileList.addUserToList(user)
            client.say(channel, '@' + user + ' ya te encuentras en la lista.');
        }else{
            fileList.addUserToList(user);
            client.say(channel, '@' + user + ' ahora te encuentras en la lista.');
        }
        io.emit('userAdded', user);
        const listCount = fileList.getListCount();
        io.emit('getListCount', listCount);
    }
}