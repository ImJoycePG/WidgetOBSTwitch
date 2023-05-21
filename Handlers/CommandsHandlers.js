const fs = require('fs');
const path = require('path');

module.exports = (client, io) => {
  const commandsFolder = './Commands';

  const processFiles = (folder, files) => {
    files.forEach((file) => {
      const filePath = path.join(folder, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const subFolder = path.join(folder, file);
        const subFiles = fs.readdirSync(subFolder);
        processFiles(subFolder, subFiles);
      } else if (file.endsWith('.js')) {
        const command = require("../" + filePath);

        client.onMessage((channel, user, text, msg) => {
          if (text.startsWith('!')) {
            const args = text.slice(1).split(' ');
            const commandName = args.shift().toLowerCase();

            if (commandName.toLowerCase() === command.name.toLowerCase()) {
              command.execute(channel, user, text, msg, client, io);
            }
          }
        });
      }
    });
  };

  fs.readdir(commandsFolder, (err, files) => {
    if (err) console.error(err);
    processFiles(commandsFolder, files);
  });
};
