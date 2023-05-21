const cooldowns = {};

module.exports = {
    name: 'status',
    execute: (channel, user, text, msg, client) => {
        const now = Date.now();

        if (cooldowns[channel] && (now - cooldowns[channel]) < 10000) {
            return;
        }

        client.say(channel, `El servicio de bot si está activo.`);

        cooldowns[channel] = now;
    }
};