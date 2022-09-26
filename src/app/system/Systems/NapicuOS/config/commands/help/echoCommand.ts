import {Line} from "../../../Apps/console/console.component";
import {SystemCommandsPrefixEnum} from "../Commands";

export const echoHelpCommand: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.echoCommand} <string>`
);

