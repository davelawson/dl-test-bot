import { Interaction } from "discord.js";

export abstract class CommandHandler {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract handle(interaction: Interaction): void;
}