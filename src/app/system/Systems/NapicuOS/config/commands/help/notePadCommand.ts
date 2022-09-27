import {Line} from "../../../apps/console/console.component";
import {SystemCommandsPrefixEnum} from "../Commands";

export const notePadUsage: Line = new Line(
  `${SystemCommandsPrefixEnum.notePadCommand} <path_to_file>`
);


export const notePadPathNotExists = (path: string): Line => {
  return new Line(
    `Cannot find file "${path}"`
  )
}

