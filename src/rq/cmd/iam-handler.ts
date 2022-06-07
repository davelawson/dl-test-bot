import { CommandInteraction, CacheType } from "discord.js";
import { RpgSession } from "../../rpg-session";
import { RqModel } from "../rq-model";
import { CmdHandler } from "./cmd-handler";

export class IamHandler extends CmdHandler {

    private model: RqModel;

    constructor(model: RqModel) {
        super(false);
        this.model = model;
    }

    override async onHandle(cmd: CommandInteraction<CacheType>, session: RpgSession | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
}