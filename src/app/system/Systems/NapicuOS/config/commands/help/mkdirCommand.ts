import {Line} from "../../../apps/console/console.component";
import {SystemCommandsPrefixEnum} from "../Commands";

export const mkdirHelpCommand: Line = new Line(
  `${SystemCommandsPrefixEnum.mkdirCommand} <dir_name>`
);

export const mkdirExists = (dirname: string): Line => {
  return new Line(
    `cannot create directory '${dirname}': File exists`
  )
}


