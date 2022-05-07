import {Line} from "../../../Apps/console/console.component";
import {SYSTEM_HOSTNAME_MAX_LENGTH, SYSTEM_HOSTNAME_MIN_LENGTH} from "../../System";

export const mkdirHelpCommand: Line = new Line(
  `mkdir <dir_name>`
);

export const mkdirExists = (dirname: string): Line => {
  return new Line(
    `cannot create directory '${dirname}': File exists`
  )
}


