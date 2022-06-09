import { CommandInteraction, CacheType } from "discord.js";
import { RpgSession } from "../../rpg-session";
import GFacade from "../../sheets/google-facade";
import { RqModel } from "../rq-model";
import { RqCmdHandler } from "./rq-cmd-handler";

export class GetHandler extends RqCmdHandler {

    constructor(model: RqModel, googleApi: GFacade) {
        super(true, model, googleApi);
    }

    override async onHandle(cmd: CommandInteraction<CacheType>, session: RpgSession): Promise<void> {
        return cmd.reply("GetHandler.onHandle()");
    }
}