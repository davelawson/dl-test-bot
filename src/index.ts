require('dotenv').config();
import { Intents, Client, Interaction, Message } from "discord.js";
import { RpgBotDispatcher } from "./rpg-bot-dispatcher";
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });

const rpgBotDispatcher: RpgBotDispatcher = new RpgBotDispatcher;

client.on('ready', () => {
    console.log("Bot dispatcher ready!");
});

client.on('interactionCreate', async (interaction: Interaction) => {
    console.log('=== NEW INTERACTION =====================================');
    console.log(interaction);
    rpgBotDispatcher.handleInteraction(interaction);
});

client.login(process.env.CLIENT_TOKEN);