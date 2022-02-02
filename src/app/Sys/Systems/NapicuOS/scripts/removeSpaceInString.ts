/**
 * Function that deletes spaces in the string
 * @param string
 */
export function removeSpace(string: string): string {
  return string.replace(/\s+/g, '');
}
