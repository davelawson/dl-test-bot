import { RpgBot } from "../rpg-bot";

class DrpgBot implements RpgBot {
    name: string = "drpg";
    description: string = "Simple bot for testing things out";
    helpCmd() {
        return 10;
    }
}

export { DrpgBot };