import {cookiesTime} from '../config/Cookies';

/**
 * Sets the value of cookies
 * @param {String} name Name of cookies
 * @param {string} value Value of cookies
 */
export function setCookies<T>(name: string, value: T): void {
  const date = new Date();
  date.setTime(date.getTime() + cookiesTime);
  document.cookie =
    name + '=' + JSON.stringify(value) + '; expires=' + date.toUTCString() + '; path=/';
}

/**
 * Returns the value of the specified cookie name
 * @param  {String} name Name of cookies
 * @returns {any} value of cookies
 */
export function getCookies<T>(name: string): T | null {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length == 2) {
    let i = parts.pop()?.split(';').shift();
    if (i) return JSON.parse(i);
    return null;
  } else {
    return null;
  }
}

/**
 * Deletes the specified cookie
 * @param  {String} name Name of cookies
 */
export function deleteCookies(name: string): void {
  const date = new Date();
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
  document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
}
