import { Interaction, CacheType, CommandInteraction } from "discord.js";
import { RpgBot } from "../rpg-bot";
import { RpgSession } from "../rpg-session";
import { ArkModel } from "./ark-model";

export class ArkBot extends RpgBot {
    constructor() {
        super("ark", "Bot for playing Ark Tenebris", new ArkModel());
    }

    onHandleCommand(command: CommandInteraction<CacheType>, session: RpgSession | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isRepliable())
            await interaction.reply({ content: 'Reply from the ArkBot!' });
        await interaction.channel?.send({ content: "Message from ArkBot!" });
    }
}