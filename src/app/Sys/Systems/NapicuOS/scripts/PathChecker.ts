export function PathHasLastSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

