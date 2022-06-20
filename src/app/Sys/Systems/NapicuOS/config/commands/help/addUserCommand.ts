import {Line} from '../../../Apps/console/console.component';
import {SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MIN_LENGTH} from "../../System";
import {SystemCommandsPrefixEnum} from "../Commands";

export const addUserUsage: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.addUserCommand} <user_name> <user_password>`
);

export const addUserShortError: Line = new Line(
  `Username is too short. Min is ${SYSTEM_USERS_MIN_LENGTH} allowed`
)

export const addUserLongError: Line = new Line(
  `Username is too long. Max is ${SYSTEM_USERS_MAX_LENGTH} allowed`
)

export const addUserAdded = (username: string): Line => {
  return new Line(
    `User "${username}" has been successfully created`
  )
}

export const addUserExists = (username: string): Line => {
  return new Line(
    `User "${username}" already exists`
  )
}
