import {Line} from "../../../Apps/console/console.component";

export const mkdirHelpCommand: Line = new Line(
  `mkdir <dir_name>`
);

export const mkdirExists = (dirname: string): Line => {
  return new Line(
    `cannot create directory '${dirname}': File exists`
  )
}


