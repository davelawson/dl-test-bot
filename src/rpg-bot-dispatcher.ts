import { Interaction, Message } from "discord.js";
import { DrpgBot } from "./drpg/drpg-bot";
import { RpgBot } from "./rpg-bot";
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

const bots: Array<RpgBot> = Array(
    new DrpgBot
);

class RpgBotDispatcher {
    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            console.log("interaction -- command");
            if (interaction.commandName === "play") {
                console.log("PLAY");
            }

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

        if (interaction.isButton()) {
            console.log("interaction -- button");
        }
    }
    handleMessage(msg: Message) : void {
        if (msg.content === "ping") {
            msg.reply("Pong!");
        }
    }
}

export { RpgBotDispatcher };