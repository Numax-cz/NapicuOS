export function PathHasLastSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}
export function PathHasntLastSlash(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path;
}
