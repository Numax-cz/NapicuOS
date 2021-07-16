import { SettingsOptions } from './SettingsOptions';

export interface ComponentOption {
  title: string;
  options: SettingsOptions[];
  selected: number;
  id: number;
}
