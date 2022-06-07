import { CommandInteraction } from "discord.js";

export abstract class CmdHandler {
    abstract handle(cmd: CommandInteraction): Promise<void>
}