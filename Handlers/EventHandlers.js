const fs = require("fs");

module.exports = (client) => {
  fs.readdir("./Events", (err, files) => {
    if (err) console.error(err);

    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const event = require(`../Events/${file}`);
      const eventName = Object.keys(event)[0];
      client[eventName]((...args) => event[eventName](client, ...args));
    });
  });
};