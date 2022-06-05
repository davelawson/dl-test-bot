const { SlashCommandBuilder } = require('@discordjs/builders');

function getArkCommandBuilder() {
    return new SlashCommandBuilder()
        .setName('ark')
        .setDescription('Send a command to the ark bot')
        .addSubcommand(sc => sc.setName('help')
            .setDescription('Get some help using the bot')
            .addStringOption(o => o.setName('command')
                .setDescription('The name of the command to get help with using')
                .setRequired(false)
                .addChoices(
                    { name: 'iam', value: 'iam' },
                    { name: 'roll', value: 'roll' },
                    { name: 'get', value: 'get' },
                    { name: 'whoami', value: 'whoami' },
                )
            )
        )
        .addSubcommand(sc => sc.setName('iam')
            .setDescription('Select which character to play as')
            .addStringOption(o => o.setName('name')
                .setDescription('The name of the character')
                .setRequired(true)
            )
        );
}

module.exports = { getArkCommandBuilder }