import { RqModel } from "../rq-model";
import { RpgCmdHandler } from "../../rpg-cmd-handler";
import { CommandInteraction } from "discord.js";
import { RpgSession } from "../../rpg-session";
import GFacade from "../../sheets/google-facade";

export abstract class RqCmdHandler extends RpgCmdHandler {
    model: RqModel;
    protected googleApi: GFacade;

    constructor(isSessionRequired: boolean, model: RqModel, googleApi: GFacade) {
        super(isSessionRequired);
        this.model = model;
        this.googleApi = googleApi;
    }
    abstract onHandle(cmd: CommandInteraction, session: RpgSession): Promise<void>
}