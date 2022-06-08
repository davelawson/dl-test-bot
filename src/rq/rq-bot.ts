import { Interaction, CacheType, CommandInteraction } from "discord.js";
import { RpgBot } from "../rpg-bot";
import { RpgSession } from "../rpg-session";
import { GetHandler } from "./cmd/get-handler";
import { IamHandler } from "./cmd/iam-handler";
import { RqModel } from "./rq-model";

export class RqBot extends RpgBot {
    model: RqModel;

    constructor() {
        let model = new RqModel();
        super("rq", "Bot for playing RuneQuest", model);
        this.model = model;
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
            await new IamHandler(this.model).handle(command, session);
        } else if (subcmd === 'get') {
            await new GetHandler(this.model).handle(command, session);
        } else {
            throw new Error("Method not implemented.");
        }
    }

    async handleInteraction(interaction: Interaction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}