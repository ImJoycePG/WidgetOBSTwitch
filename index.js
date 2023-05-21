const { RefreshingAuthProvider } = require('@twurple/auth');
const { ChatClient } = require('@twurple/chat');
const fs = require('fs');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const tokens = require('./tokens.json');
const config = require('./config.json');
const filePath = './list.json';

const eventHandlers = require('./Handlers/EventHandlers.js');
const commandsHandlers = require('./Handlers/CommandsHandlers.js');

const fileList = require('./Controllers/fileList');
const mapList = require('./Controllers/randomMap');

const clientId = config.ClientID;
const clientSecret = config.ClientIDSecret;
const refreshToken = tokens.refreshToken;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('disconnect', () => {

    });

    socket.on('userAdded', (user) => {
        fileList.addUserToList(user);
        io.emit('list', { listUsers: fileList.getAllNames() });
    });
    socket.on('userDelete', (user) => {
        fileList.removeUserFromList(user);
        io.emit('list', { listUsers: fileList.getAllNames() });
    });

    socket.on('resetList', () => {
        fileList.removeAllUsersFromList();
        io.emit('list', { listUsers: fileList.getAllNames() });
    });

    socket.on('getListCount', () => {
        const listCount = fileList.getListCount();
        socket.emit('count', listCount);
    });

    socket.on('randomMap', () => {
        const randomMap = mapList.getRandomMap();
        socket.emit('randomMap', randomMap);
    });    
});
  

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});

const authProvider = new RefreshingAuthProvider({
    clientId,
    clientSecret,
    onRefresh: async (userId, newTokenData) => {
        tokens.refreshToken = newTokenData.refreshToken;
        await fs.writeFile(`./tokens.json`, JSON.stringify(newTokenData, null, 4), 'UTF-8', (err) => {
            if (err) throw err;
            console.log('Token refresh successful!');
        });
    }
});

config.Channels.forEach(channel => {
    authProvider.addUser(channel.name, {
        accessToken: authProvider.getAppAccessToken(true),
        refreshToken: refreshToken
    }, ['chat']);
});


const client = new ChatClient({ authProvider, channels: config.Channels.map(channel => channel.name) });
const bot_channel = config.Channels.map(channel => channel.name);
console.log(`> Conectando a ${bot_channel.join(', ')}`);
client.connect();

eventHandlers(client);
commandsHandlers(client, io);

fileList.createFileIfNotExists();
