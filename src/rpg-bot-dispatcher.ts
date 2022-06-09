import { Interaction } from "discord.js";
import { ArkBot } from "./ark/ark-bot";
import { DrpgBot } from "./drpg/drpg-bot";
import { RpgBot } from "./rpg-bot";
import { RqBot } from "./rq/rq-bot";

class RpgBotDispatcher {
    bots: Array<RpgBot> = Array(
        <RpgBot>new DrpgBot(),
        <RpgBot>new ArkBot(),
        <RpgBot>new RqBot(),
    );

    public setup() {
        this.bots.forEach(bot => bot.setup());
    }

    private getBot(botName: string): RpgBot | undefined {
        return this.bots.find(bot => bot.name === botName);
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        console.log('=== NEW INTERACTION =====================================');
        console.log(interaction);
        if (interaction.isCommand()) {
            let bot = this.getBot(interaction.commandName);
            if (bot === undefined) {
                console.log("Unable to find bot " + interaction.commandName);
                await interaction.reply({ content: 'Unable to find a bot "' + interaction.commandName + '"' });
            } else {
                await bot.handleCommand(interaction);
            }
        } else if (interaction.isModalSubmit()) {
            console.log('=== MODAL SUBMIT ========================================');
            console.log(interaction);
        }
    }
}

export { RpgBotDispatcher };