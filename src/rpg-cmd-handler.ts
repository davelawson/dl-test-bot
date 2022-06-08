import { CommandInteraction } from "discord.js";
import { RpgSession } from "./rpg-session";

export abstract class RpgCmdHandler {
    private isSessionRequired: boolean;

    constructor(isSessionRequired: boolean) {
        this.isSessionRequired = isSessionRequired;
    }

    abstract onHandle(cmd: CommandInteraction, session: RpgSession): Promise<void>;
    public handle(cmd: CommandInteraction, session: RpgSession): Promise<void> {
        if (!this.isSessionRequired || session.isInitialized) {
            return this.onHandle(cmd, session);
        } else {
            return cmd.reply("Please select a character using the 'iam' subcommand first.");
        }
    }
}