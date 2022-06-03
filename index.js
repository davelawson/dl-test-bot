require('dotenv').config();
const { Client, Intents } = require('discord.js');
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// client.on('messageUpdate', (oldMsg, newMsg) => {
//     if (newMsg.content === 'ping') {
//         newMsg.reply('Pong!');
//     }
//   });

client.on('messageCreate', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  });

client.login(process.env.CLIENT_TOKEN);