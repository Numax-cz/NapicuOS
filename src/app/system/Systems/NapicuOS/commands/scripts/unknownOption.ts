import {Line} from "../../apps/console/console.component";

export function unknownOption(param: string): Line {
  return new Line(`Invalid option '${param}'`, 'white');
}
