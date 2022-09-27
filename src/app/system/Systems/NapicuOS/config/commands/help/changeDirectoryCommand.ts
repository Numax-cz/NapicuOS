import {Line} from "../../../apps/console/console.component";
import {SystemCommandsPrefixEnum} from "../Commands";

export const changeDirectoryHelpCommand: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.cdCommand} <directory>`
);

export const directoryNotFoundError = (directory: string): Line => {
  return new Line(
    `Cannot find path "${directory}"`
  )
}
