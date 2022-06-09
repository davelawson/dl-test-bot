export class RpgSession {
    public isInitialized: boolean;
    public sheetName: string | undefined;
    constructor() {
        this.isInitialized = false;
        this.sheetName = undefined;
    }
}