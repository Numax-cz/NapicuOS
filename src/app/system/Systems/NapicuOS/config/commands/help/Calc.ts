import {Line} from "../../../Apps/console/console.component";
import {SystemCommandsPrefixEnum} from "../Commands";

export const calcHelpCommand: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.calcCommand} <string>`
);
