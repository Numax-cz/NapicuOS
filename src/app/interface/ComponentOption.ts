import { SettingsOptions } from './SettingsOptions';

export interface ComponentOption {
  title: string;
  options: SettingsOptions[];
  id: number;
  selected: number;
}
