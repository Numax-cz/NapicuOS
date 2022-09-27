import {Line} from "../../../apps/console/console.component";
import {SystemCommandsArgsEnum, SystemCommandsPrefixEnum} from "../Commands";


export const rebootTimeoutNowHelpCommand: Line = new Line(
  `Use ${SystemCommandsPrefixEnum.rebootCommand} ${SystemCommandsArgsEnum.reboot_kill_process} to cancel`
)

export const rebootTimeoutHelpCommand: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.rebootCommand} <time_in_ms / ${SystemCommandsArgsEnum.reboot_now}>
${rebootTimeoutNowHelpCommand.Write().value}`
);


