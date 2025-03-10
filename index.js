const settings = require('./Settings.json');
const AdBot = require('discord.js-selfbot-v13');

const AdBotClient = new AdBot.Client({ checkUpdate: false });
let targetChannel = null;

AdBotClient.once('ready', async () => {
    console.log(`Logged Into ${AdBotClient.user.username}`);

    targetChannel = AdBotClient.channels.cache.get(settings.channels);
    if (!targetChannel) {
        console.log("Channel not found.");
        return;
    }

    console.log("Bot is ready. Sending first claim...");

    try {
        await targetChannel.sendSlash("668075833780469772", "claim");
        console.log("First claim sent.");
    } catch (err) {
        console.error("Error sending first claim:", err);
    }

    scheduleNextRun();
});

function scheduleNextRun() {
    let anhour = 1 * 60 * 60 * 1000;
    let random = randomIntFromInterval(0, 60) * 60 * 1000;
    let delay = anhour + random;

    console.log(`Next claim in: ${delay / (60 * 1000)} minutes`);
    
    setTimeout(async () => {
        if (!targetChannel) {
            console.log("Channel not available.");
            return;
        }

        try {
            console.log("Sending claim command...");
            await targetChannel.sendSlash("668075833780469772", "claim");
        } catch (err) {
            console.error("Error sending claim command:", err);
        }

        scheduleNextRun();
    }, delay);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

AdBotClient.login(settings.token);
