const { SlashCommandBuilder } = require('@discordjs/builders');

function getRqCommandBuilder() {
    return new SlashCommandBuilder()
        .setName('rq')
        .setDescription('Send a command to the RuneQuest bot')
        .addSubcommand(sc => sc.setName('iam')
            .setDescription('Select a character')
            .addStringOption(so => so.setName('character-name')
                .setDescription('The name of the character to play as')
                .setRequired(true)
            )
        )
        .addSubcommand(sc => sc.setName('status')
            .setDescription('Display your character status')
        )
        .addSubcommand(sc => sc.setName('get')
            .setDescription('Display a specific value on the character sheet')
            .addStringOption(so => so.setName('get-category')
                .setDescription('What to retrieve')
                .setRequired(true)
                .addChoices(
                    { name: 'rep', value: 'rep' },
                    { name: 'stat', value: 'stat' },
                    { name: 'skill', value: 'skill' },
                    { name: 'rune', value: 'rune' },
                    { name: 'passion', value: 'passion' },
                )
            )
        );
}

module.exports = { getRqCommandBuilder }