import {Line} from '../../../Apps/console/console.component';
import {SYSTEM_HOSTNAME_MAX_LENGTH, SYSTEM_HOSTNAME_MIN_LENGTH} from '../../System';
import {SystemCommandsPrefixEnum} from "../Commands";

export const setHelpCommand: Line = new Line(
  `Options:
    windowtitle - Sets the terminal name
    hostname - Sets the hostname`
);

export const setWindowTitleHelpCommand: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.setCommand} windowtitle <pid> <new_title>`
);

export const setHostnameHelpCommand: Line = new Line(
  `Usage: ${SystemCommandsPrefixEnum.setCommand} hostname <hostname>`
)

export const setHostnameShortError: Line = new Line(
  `Hostname is too short. Min is ${SYSTEM_HOSTNAME_MIN_LENGTH} allowed`
)

export const setHostnameLongError: Line = new Line(
  `Hostname is too long. Max is ${SYSTEM_HOSTNAME_MAX_LENGTH} allowed`
)

export const setHostnameSet = (hostname: string): Line => {
  return new Line(
    `Hostname has been successfully set to ${hostname}`
  )
}
