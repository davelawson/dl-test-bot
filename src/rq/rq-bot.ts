import { Interaction, CacheType, CommandInteraction } from "discord.js";
import { RpgBot } from "../rpg-bot";
import { RpgSession } from "../rpg-session";
import GFacade from "../sheets/google-facade";
import { GetHandler } from "./cmd/get-handler";
import { IamHandler } from "./cmd/iam-handler";
import { RqModel } from "./rq-model";

export class RqBot extends RpgBot {
    model: RqModel;
    googleApi: GFacade;

    constructor() {
        let model = new RqModel();
        super("rq", "Bot for playing RuneQuest", model);
        this.model = model;
        this.googleApi = new GFacade('1tV4cV-Z5e_QCpNlCF6yKgudv7APgK91qT-qv_UogRFA');
    }

    override async setup() : Promise<void> {
        console.log("RqBot initializing...");
        console.log("RqBot authorizing googleApi...");
        await this.googleApi.authorize();
        if (!this.googleApi.authorized) {
            console.log("RqBot failed to authorize google api!")
        }
        console.log("RqBot ready!");
    }

    public async onHandleCommand(command: CommandInteraction<CacheType>, session: RpgSession): Promise<void> {
        /**
         * Commands to handle:
         * - iam
         * - status
         * - get rune
         * - get skill
         * - get stat
         * - get passion
         * - get status
         * - roll check
         * - roll rune
         * - roll skill
         * - roll stat
         * - roll passion
         * - roll hitloc
         */
        let subcmd: string = command.options.getSubcommand();
        if (subcmd === 'iam') {
            await new IamHandler(this.model, this.googleApi).handle(command, session);
        } else if (subcmd === 'get') {
            await new GetHandler(this.model, this.googleApi).handle(command, session);
        } else {
            throw new Error("Method not implemented.");
        }
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}