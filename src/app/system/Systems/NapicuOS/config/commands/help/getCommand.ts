import {Line} from '../../../apps/console/console.component';
import {SystemCommandsArgsEnum} from "../Commands";

export const getHelpCommandAPPS: Line = new Line(
  `\t\t--open - Returns open GUI applications
    \t\t--close - Returns close GUI applications`
);

export const getHelpCommand: Line = new Line(
  `Options:
    ${SystemCommandsArgsEnum.get_SystemProcess} - Returns system processes running in the background
    ${SystemCommandsArgsEnum.get_Commands} - Returns available commands
    ${SystemCommandsArgsEnum.get_Apps} - Returns running GUI applications
    ${getHelpCommandAPPS.Write().value}
    ${SystemCommandsArgsEnum.get_Users} - Returns registered users`);
