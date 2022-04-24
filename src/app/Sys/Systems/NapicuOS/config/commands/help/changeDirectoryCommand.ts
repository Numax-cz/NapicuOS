import {Line} from "../../../Apps/console/console.component";
import {SYSTEM_HOSTNAME_MIN_LENGTH} from "../../system";

export const changeDirectoryHelpCommand: Line = new Line(
  `Usage: cd <directory>`
);

export const directoryNotFoundError = (directory: string): Line => {
  return new Line(
    `Cannot find path "${directory}"`
  )
}
