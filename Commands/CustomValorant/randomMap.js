const mapList = require('../../Controllers/randomMap');
let selectedMap = mapList.getMapSelect();

module.exports = {
    name: 'randomMap',
    execute: async (channel, user, text, msg, client, io) => {
        if (msg.userInfo.isMod) { //isBroadcaster
            selectedMap = mapList.getRandomMap();
            mapList.setMapSelect(selectedMap);
            client.say(channel, `Se ha elegido de forma aleatoria el mapa: ${selectedMap.nameMap}`);
            io.emit('randomMap', selectedMap);
        }
    }
}