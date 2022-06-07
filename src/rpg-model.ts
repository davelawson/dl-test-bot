import { User } from "discord.js";
import { RpgSession } from "./rpg-session";

export class RpgModel {
    private usersToSheetsMap: Map<string, RpgSession>;

    constructor() {
        this.usersToSheetsMap = new Map<string, RpgSession>();
    }

    public getSession(author: User): RpgSession | undefined {
        let session = this.usersToSheetsMap.get(author.toString()) || new RpgSession();
        this.usersToSheetsMap.set(author.toString(), session);
        return session;
    }
}