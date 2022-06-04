require('dotenv').config();
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });
// const { RpgBot } = require('rpg-bot.js');
import { RpgBot } from "./rpg-bot";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on('interactionCreate', async interaction => {
    console.log("interaction");
    if (interaction.isCommand()) {
        console.log("interaction -- command");

        if (interaction.commandName === 'help') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('primary')
                        .setLabel('Primary')
                        .setStyle('PRIMARY'),
                );

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Some title')
                .setDescription('Some description here');

            await interaction.reply({ content: 'Help!', ephemeral: true, embeds: [embed], components: [row] });
        }
    }

    if (interaction.isButton) {
        console.log("interaction -- button");
    }


});

client.login(process.env.CLIENT_TOKEN);