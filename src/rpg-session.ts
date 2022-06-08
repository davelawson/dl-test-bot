export class RpgSession {
    public isInitialized: boolean;
    public characterName: string | undefined;
    constructor() {
        this.isInitialized = false;
        this.characterName = undefined;
    }
}