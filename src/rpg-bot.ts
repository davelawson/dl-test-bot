import { Interaction } from "discord.js";

export abstract class RpgBot {
    readonly name: string;
    readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract helpCommand(interaction: Interaction) : void;
    public handleCommand(interaction: Interaction) : void {
        if (interaction.isCommand()) {
            if (interaction.commandName === "help") this.helpCommand(interaction);
        }
        console.log("rpg-bot asked to handle a command that is not a command!");
    }
}