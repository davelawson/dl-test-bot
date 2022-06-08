import { RqModel } from "../rq-model";
import { RpgCmdHandler } from "../../rpg-cmd-handler";
import { CommandInteraction } from "discord.js";
import { RpgSession } from "../../rpg-session";

export abstract class RqCmdHandler extends RpgCmdHandler {
    model: RqModel;    
    constructor(isSessionRequired: boolean, model: RqModel) {
        super(isSessionRequired);
        this.model = model;
    }
    abstract onHandle(cmd: CommandInteraction, session: RpgSession): Promise<void>
}