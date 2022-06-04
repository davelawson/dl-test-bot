import { Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { DrpgBot } from "./drpg/drpg-bot";
import { RpgBot } from "./rpg-bot";
import { CommandHandler } from "./command-handler";


class RpgBotDispatcher {
    bots: Array<RpgBot> = Array(
        new DrpgBot
    );
    
    activeBot: RpgBot | undefined;
    cmdHandlers: Array<CommandHandler> = Array(new class extends CommandHandler {
        public handle(interaction : Interaction): void {
            console.log("playCommandHandler::handle()");
            if ( interaction.isCommand()) {
                interaction.reply({ content: 'Play!'});
            }
        }
    }("play"));
    
    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            console.log("interaction -- command: " + interaction.commandName);
            // Check if we have a handler for this command
            let handler: CommandHandler | undefined = this.cmdHandlers.find(handler => handler.name === interaction.commandName);
            if (handler != undefined) {
                handler.handle(interaction);
            }
            // Otherwise, check if the active bot has a handler for this command
            if (this.activeBot != undefined) {
                this.activeBot.handleCommand(interaction);
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