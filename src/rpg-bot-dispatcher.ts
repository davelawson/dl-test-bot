import { Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ArkBot } from "./ark/ark-bot";
import { DrpgBot } from "./drpg/drpg-bot";
import { RpgBot } from "./rpg-bot";

class RpgBotDispatcher {
    bots: Array<RpgBot> = Array(
        <RpgBot> new DrpgBot(),
        <RpgBot> new ArkBot()
    );
    
    private getBot(botName: string) : RpgBot | undefined {
        return this.bots.find(bot => bot.name === botName);
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            let bot = this.getBot(interaction.commandName);
            if (bot === undefined) {
                console.log("Unable to find bot " + interaction.commandName);
                await interaction.reply( { content: 'Unable to find a bot "' + interaction.commandName + '"'});
            } else {
                await bot.handleCommand(interaction);
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