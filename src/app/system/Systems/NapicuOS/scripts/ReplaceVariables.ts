import {SystemVariables} from "../config/SystemVariables";

export function ReplaceSystemVariables(value: string): string {
  let out = value;
  for (const key of Object.keys(SystemVariables)) {
    let regex: RegExp = new RegExp(key, 'g');
    out = out.replace(regex, SystemVariables[key]() || "UNDEFINED");
  }
  return out;
}
