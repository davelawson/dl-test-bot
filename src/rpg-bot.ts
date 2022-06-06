import { CommandInteraction, Interaction } from "discord.js";

export abstract class RpgBot {
    readonly name: string;
    readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract handleInteraction(interaction: Interaction) : Promise<void>;
    abstract handleCommand(command: CommandInteraction) : Promise<void>;
}