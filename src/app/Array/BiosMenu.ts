import { BiosMenu } from '../interface/BiosMenu';
import { getLanguage } from '../Scripts/getLanguage';

export var lang = getLanguage();
export var Menu: BiosMenu[] = [
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
