import {Line} from "../../apps/console/console.component";

export function usageCommand(cmd: string): Line {
  return new Line(`usage: ${cmd}`);
}
