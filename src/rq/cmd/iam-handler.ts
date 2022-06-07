import { CommandInteraction, CacheType } from "discord.js";
import { RqModel } from "../rq-model";
import { CmdHandler } from "./cmd-handler";

export class IamHandler extends CmdHandler {

    private model:RqModel;

    constructor(model:RqModel) {
        super();
        this.model = model;
    }

    public async handle(cmd: CommandInteraction<CacheType>): Promise<void> {
        throw new Error("Method not implemented.");
    }

}