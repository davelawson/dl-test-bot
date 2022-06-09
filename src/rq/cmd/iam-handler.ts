import { CommandInteraction, CacheType } from "discord.js";
import { getCmdOption, getReplyContext } from "../../reply-utils";
import { RpgSession } from "../../rpg-session";
import GFacade from "../../sheets/google-facade";
import { RqModel } from "../rq-model";
import { RqCmdHandler } from "./rq-cmd-handler";

export class IamHandler extends RqCmdHandler {

    constructor(model: RqModel, googleApi: GFacade) {
        super(false, model, googleApi);
    }

    override async onHandle(cmd: CommandInteraction<CacheType>, session: RpgSession): Promise<void> {
        let sheetName: string = getCmdOption(cmd, 'iam', 'character-name')!;
        session.sheetName = sheetName;
        session.isInitialized = true;
        
        // Now let's make sure we can read the sheet. Specifically the character name on the sheet
        const nameOnSheet = await this.googleApi.queryCell(sheetName, "D2");
        console.log(nameOnSheet);

        return cmd.reply("Now acting as " + nameOnSheet + " (from " + session.sheetName + ")");
    }
}