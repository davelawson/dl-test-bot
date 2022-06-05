import { Interaction, CacheType } from "discord.js";
import { CommandHandler } from "./command-handler";
import { RpgBotSelector } from "./rpg-bot-selector";

export class PlayCommandHandler extends CommandHandler {
    botSelector: RpgBotSelector;
    constructor(botSelector: RpgBotSelector) {
        super("play");
        this.botSelector = botSelector;
    }
    public handle(interaction : Interaction): void {
        if ( interaction.isCommand()) {
            let game: string = interaction.options.getString("game", true);
            if (this.botSelector.selectBot(game)) {
                interaction.reply({content: "Now playing " + game});
            } else {
                interaction.reply({content: "I don't know how to play " + game});
            }
        }
    }
}