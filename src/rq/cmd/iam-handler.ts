import { CommandInteraction, CacheType } from "discord.js";
import { getCmdOption, getReplyContext } from "../../reply-utils";
import { RpgSession } from "../../rpg-session";
import { RqModel } from "../rq-model";
import { RqCmdHandler } from "./rq-cmd-handler";

export class IamHandler extends RqCmdHandler {

    constructor(model: RqModel) {
        super(false, model);
    }

    override async onHandle(cmd: CommandInteraction<CacheType>, session: RpgSession): Promise<void> {
        let name: string = getCmdOption(cmd, 'iam', 'character-name')!;
        session.characterName = name;
        session.isInitialized = true;
        return cmd.reply(getReplyContext(cmd) + "Now acting as " + session.characterName);
    }
}