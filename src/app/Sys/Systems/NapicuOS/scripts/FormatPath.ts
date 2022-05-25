import {ReplaceSystemVariables} from "./ReplaceVariables";

export function FormatPathToObject(path: string): string[]{
  let pth = ReplaceSystemVariables(path).split('/');
  pth.shift();
  if (path.endsWith("/")) pth.pop();
  return pth;
}
