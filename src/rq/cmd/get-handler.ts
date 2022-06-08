import { CommandInteraction, CacheType } from "discord.js";
import { RpgSession } from "../../rpg-session";
import { RqModel } from "../rq-model";
import { RqCmdHandler } from "./rq-cmd-handler";

export class GetHandler extends RqCmdHandler {

    constructor(model: RqModel) {
        super(true, model);
    }

    override async onHandle(cmd: CommandInteraction<CacheType>, session: RpgSession): Promise<void> {
        return cmd.reply("GetHandler.onHandle()");
    }
}