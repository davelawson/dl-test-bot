import { User } from "discord.js";
import { RpgSession } from "./rpg-session";

export class RpgModel {
    private usersToSheetsMap: Map<string, RpgSession>;

    constructor() {
        this.usersToSheetsMap = new Map<string, RpgSession>();
    }

    public getSession(author: User): RpgSession {
        if (!this.usersToSheetsMap.has(author.toString())) {
            let newSession = new RpgSession();
            this.usersToSheetsMap.set(author.toString(), newSession);
            console.log("Creating a new session for " + author.toString());
            return newSession;
        } else {
            console.log("Found existing session for " + author.toString());
            return this.usersToSheetsMap.get(author.toString())!;
        }
    }
}