import { BiosMenu } from '../interface/BiosMenu';
import { getLanguage } from '../Scripts/getLanguage';

setLanguage();
export var lang: any;
/**
 * @returns Returns the top main menu
 */
export function getMenu(): BiosMenu[] {
  return [
    {
      title: lang.TopMenu.main_title,
      router: 'main',
    },
    {
      title: lang.TopMenu.advanced_title,
      router: 'advanced',
    },
    {
      title: lang.TopMenu.boot_title,
      router: 'bootb',
    },
    {
      title: lang.TopMenu.tools_title,
      router: 'tools',
    },
    {
      title: lang.TopMenu.exit_title,
      router: 'exit',
    },
  ];
}

/**
 * Sets the desired language
 */
export function setLanguage(): void {
  lang = getLanguage();
}
