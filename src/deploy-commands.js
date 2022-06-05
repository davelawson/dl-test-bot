require('dotenv').config();
const { getArkCommandBuilder } = require('./ark/build-commands');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    getArkCommandBuilder(),
    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Select which bot to use.')
        .addStringOption(option => option.setName('game')
            .setDescription('The name of the game bot to activate: drpg')
            .setRequired(true)
            .addChoices(
                { name: "drpg", value: "drpg" },
                { name: "ark", value: "ark" },
                { name: "rq", value: "rq" },
                { name: "dnd", value: "dnd" })),
    // Each bot needs to provide functionality to satisfy each of the below commands
    new SlashCommandBuilder()
        .setName('drpg')
        .setDescription('Issue a command to the drpg bot.')
        .addSubcommand(subcommand => subcommand.setName('help')
            .setDescription('Ask the bot for some help'))
        .addSubcommand(subcommand =>
            subcommand.setName('roll')
                .setDescription('Roll some dice')
                .addNumberOption(option => option
                    .setName('dice')
                    .setDescription('# of dice')
                    .setRequired(true))
                .addNumberOption(option => option
                    .setName('faces')
                    .setDescription('# of faces')
                    .setRequired(true))
                .addNumberOption(option => option
                    .setName('target')
                    .setDescription('Target #')
                    .setRequired(false))),
    new SlashCommandBuilder().setName('help').setDescription('Displays the list of commands and how each of them works.'),
    new SlashCommandBuilder().setName('iam').setDescription('Select which character to play.'),
    new SlashCommandBuilder().setName('roll').setDescription('Roll some dice, based on the selected character if you want.'),
    new SlashCommandBuilder().setName('get').setDescription('Display some character specific values.'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);