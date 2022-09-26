import {Line} from "../../Apps/console/console.component";

export function usageCommand(cmd: string): Line {
  return new Line(`usage: ${cmd}`);
}
