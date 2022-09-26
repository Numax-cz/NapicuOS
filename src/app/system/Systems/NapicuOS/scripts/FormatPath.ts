export function FormatPathToObject(path: string): string[]{
  let pth = path.split('/');
  pth.shift();
  if (path.endsWith("/")) pth.pop();
  return pth;
}
