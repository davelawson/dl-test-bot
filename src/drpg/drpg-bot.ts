import { CommandInteraction, Interaction, MessageActionRow, MessageSelectMenu } from "discord.js";
import { RpgBot } from "../rpg-bot";

class DrpgBot extends RpgBot {
    constructor() {
        super("drpg", "Simple bot for testing things out");
    }

    async handleCommand(command: CommandInteraction): Promise<void> {
        
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        interaction.isCommand() && interaction.options.getSubcommand
        if (interaction.isRepliable()) {
            const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('test-message-select-id')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
                            emoji: '1️⃣' 
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
                            emoji: '2️⃣'
						},
					]),
			);
            await interaction.reply({ content: 'Reply from the DrpgBot!', components: [row] });
        }
        await interaction.channel?.send({ content: "Message from DrpgBot!" });
    }
}

export { DrpgBot };