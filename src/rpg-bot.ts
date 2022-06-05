import { Interaction } from "discord.js";

export abstract class RpgBot {
    readonly name: string;
    readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract handleCommand(interaction: Interaction) : Promise<void>;
}