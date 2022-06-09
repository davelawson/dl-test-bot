import { RqModel } from "../rq-model";
import { RpgCmdHandler } from "../../rpg-cmd-handler";
import { CommandInteraction } from "discord.js";
import { RpgSession } from "../../rpg-session";
import GFacade from "../../sheets/google-facade";
import { RqFieldMap } from "../rq-field-map";

export abstract class RqCmdHandler extends RpgCmdHandler {
    model: RqModel;
    protected googleApi: GFacade;

    constructor(isSessionRequired: boolean, model: RqModel, googleApi: GFacade) {
        super(isSessionRequired);
        this.model = model;
        this.googleApi = googleApi;
    }
    abstract onHandle(cmd: CommandInteraction, session: RpgSession): Promise<void>;

    public async getFieldFromCell(sheetName: string, fieldName: string) {
        let address: string | undefined = RqFieldMap.getFieldAddress(fieldName);
        if (address !== undefined) {
            return await this.googleApi.queryCell(sheetName, address);
        } else {
            console.log("No cell mapping available for '" + fieldName + "'");
        }
    }

    public getFieldFromRange(fieldName: string, rangeName: string) {

    }
}