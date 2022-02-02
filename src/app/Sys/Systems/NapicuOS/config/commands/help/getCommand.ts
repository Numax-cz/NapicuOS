import {Line} from '../../../Apps/console/console.component';

export const getHelpCommandAPPS: Line = new Line(
    `\t\t--open - Returns open GUI applications
    \t\t--close - Returns close GUI applications`
);

export const getHelpCommand: Line = new Line(
    `Options:
    systemprocess - Returns system processes running in the background
    commands - Returns available commands
    apps - Returns running GUI applications
    ${getHelpCommandAPPS.Write().value}`
);
