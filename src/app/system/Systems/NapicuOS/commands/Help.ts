import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {Line} from "../apps/console/console.component";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {SystemFile} from "../SystemComponents/File";

export function initHelp(): void {
  NapicuOS.register_command(
    new Command("Help", SystemCommandsPrefixEnum.helpCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        let exportLines: Line[] = [];
        if(terminal){
          let commands = NapicuOS.get_available_commands();
          exportLines.push(
            new Line(
              `<command name> > <command> : <description>
                   `,
              'white'
            )
          );
          commands.forEach((value: SystemFile, index: number) => {
            exportLines.push(
              new Line(
                `${value.value.commandName} > ${value.value.command} : ${value.value.commandHelp}`,
                'white'
              )
            );
          });
          return resolve({
            linesForCMD: exportLines,
            stateCode: CommandStateCodeMetadata.success,
          });

        }
      });
    }, "Help command")
  )
}
