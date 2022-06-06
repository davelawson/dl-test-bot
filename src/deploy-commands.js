require('dotenv').config();
const { getArkCommandBuilder } = require('./ark/build-commands');
const { getDrpgCommandBuilder } = require('./drpg/build-commands');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    getArkCommandBuilder(),
    getDrpgCommandBuilder(),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);