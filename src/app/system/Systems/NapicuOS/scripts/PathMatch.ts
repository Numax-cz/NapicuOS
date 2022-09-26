import {PathHasLastSlash} from "./PathChecker";

export function IsPathMatch(path: string, pathToMatch: string): boolean{
  return (PathHasLastSlash(path ) === PathHasLastSlash(pathToMatch))
}
