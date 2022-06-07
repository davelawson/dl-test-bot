import { CommandInteraction } from "discord.js";
import { RpgSession } from "../../rpg-session";

export abstract class CmdHandler {
    private isSessionRequired: boolean;

    constructor(isSessionRequired: boolean) {
        this.isSessionRequired = isSessionRequired;
    }

    abstract onHandle(cmd: CommandInteraction, session: RpgSession | undefined): Promise<void>
    public handle(cmd: CommandInteraction, session: RpgSession | undefined): Promise<void>{
        if (!this.isSessionRequired || session !== undefined) {
            return this.onHandle(cmd, session);
        } else {
            return cmd.reply("Please select a character using the 'iam' subcommand first.");
        }
    }
}