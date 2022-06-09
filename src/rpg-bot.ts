import { CommandInteraction, Interaction } from "discord.js";
import { RpgModel } from "./rpg-model";
import { RpgSession } from "./rpg-session";

export abstract class RpgBot {
    readonly name: string;
    readonly description: string;
    private baseModel: RpgModel;

    constructor(name: string, description: string, baseModel: RpgModel) {
        this.name = name;
        this.description = description;
        this.baseModel = baseModel;
    }

    public async setup(): Promise<void> {}
    abstract handleInteraction(interaction: Interaction): Promise<void>;

    handleCommand(command: CommandInteraction): Promise<void> {
        return this.onHandleCommand(command, this.baseModel.getSession(command.user))
    }
    abstract onHandleCommand(command: CommandInteraction, session: RpgSession): Promise<void>;
}