import { CommandInteraction, Interaction } from "discord.js";

export function getReplyContext(interaction: Interaction): string {
    if (interaction.isCommand()) {
        let context:string = 'Replying to /' + interaction.commandName;
        interaction.options.data.forEach((data) => {
            context += ' ' + data.name;
            data.options?.forEach((option) => {
                context += ' ' + option.name + ':' + option.value;
            });
        });
        return context + '\n';
    } else {
        return 'Unable to determine context for the command being replied to!\n';
    }
}

export function getCmdOption(cmd: CommandInteraction, cmdName: string, optionName: string): string | undefined {
    return cmd.options.data.find(data => data.name === 'iam')?.options?.find(option => option.name === 'character-name')?.value?.toString();
}