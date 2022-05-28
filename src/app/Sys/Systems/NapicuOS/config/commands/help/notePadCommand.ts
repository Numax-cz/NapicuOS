import {Line} from "../../../Apps/console/console.component";
import {SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MIN_LENGTH} from "../../System";
import {SystemCommandsPrefixEnum} from "../Commands";

export const notePadUsage: Line = new Line(
  `${SystemCommandsPrefixEnum.notePadCommand} <path_to_file>`
);


export const notePadPathNotExists = (path: string): Line => {
  return new Line(
    `Cannot find file "${path}"`
  )
}

