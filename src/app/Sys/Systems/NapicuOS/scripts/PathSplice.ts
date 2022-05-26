import {ReplaceSystemVariables} from "./ReplaceVariables";
import {PathSpliceMetadata} from "../interface/PathSplice";

export function  PathSpliceLastIndex(path: string): PathSpliceMetadata{
  let pth: string[] = path.split('/');
  pth.shift();
  if (path.endsWith("/")) pth.pop();
  return {path: `/${pth.splice(0, pth.length - 1).join('/')}`, removed: pth[pth.length - 1] }
}
