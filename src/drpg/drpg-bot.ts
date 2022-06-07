import { CommandInteraction, Interaction, MessageActionRow, MessageSelectMenu, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { RpgBot } from "../rpg-bot";
import { RpgSession } from "../rpg-session";
import { DrpgModel } from "./drpg-model";

class DrpgBot extends RpgBot {
	constructor() {
		super("drpg", "Simple bot for testing things out", new DrpgModel());
	}

	async onHandleCommand(command: CommandInteraction, session: RpgSession | undefined): Promise<void> {
		let subcommand: string = command.options.getSubcommand(true);
		if (subcommand === 'test') {
			console.log('test');
			const favoriteColorInput: ModalActionRowComponent = new TextInputComponent()
			.setCustomId('favoriteColorInput')
			.setLabel("What's your favorite color?")
			.setStyle('SHORT');
			const firstActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(favoriteColorInput);
			const hobbiesInput = new TextInputComponent()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
			.setStyle('PARAGRAPH');
			const secondActionRow = new MessageActionRow<ModalActionRowComponent>().addComponents(hobbiesInput);
			// Add inputs to the modal
			const modal = new Modal()
				.setCustomId('drpgTestModal')
				.setTitle('Test Options')
				.addComponents(firstActionRow, secondActionRow);
			// Show the modal to the user
			await command.showModal(modal);
		} else if (subcommand === 'roll') {
			console.log('roll');
		}
	}

	async handleInteraction(interaction: Interaction): Promise<void> {
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