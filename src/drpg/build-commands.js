const { SlashCommandBuilder } = require('@discordjs/builders');

function getDrpgCommandBuilder() {
    return new SlashCommandBuilder()
        .setName('drpg')
        .setDescription('Send a command to the drpg bot')
        .addSubcommand(sc => sc.setName('test')
            .setDescription('Test something')
        )
        .addSubcommand(sc => sc.setName('roll')
            .setDescription('Roll some dice')
            .addIntegerOption(io => io.setName('dice')
                .setMinValue(1)
                .setDescription('# of dice to roll')
                .setRequired(true)
            )
            .addIntegerOption(io => io.setName('faces')
                .setMinValue(2)
                .setDescription('# of faces on each die')
                .setRequired(true)
            )
        );
}

module.exports = { getDrpgCommandBuilder }