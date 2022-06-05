import { Interaction } from "discord.js";
import { RpgBot } from "../rpg-bot";

class DrpgBot extends RpgBot {
    constructor() {
        super("drpg", "Simple bot for testing things out");
    }

    async handleCommand(interaction: Interaction): Promise<void> {
        if (interaction.isRepliable())
            await interaction.reply({ content: 'Reply from the DrpgBot!' });
        await interaction.channel?.send({ content: "Message from DrpgBot!" });
    }
}

export { DrpgBot };