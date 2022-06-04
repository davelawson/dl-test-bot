export interface CommandHandler {
    cmd: string;
    handle: () => number;
}