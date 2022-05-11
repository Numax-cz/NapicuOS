import {Line} from "../../../Apps/console/console.component";

export const changeDirectoryHelpCommand: Line = new Line(
  `Usage: cd <directory>`
);

export const directoryNotFoundError = (directory: string): Line => {
  return new Line(
    `Cannot find path "${directory}"`
  )
}
