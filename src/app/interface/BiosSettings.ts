import { Option } from './Option';

export interface BiosSettings {
  selected: number;
  Move(e: KeyboardEvent): void;
  MainOption: Option[];
  OpenMenu(e: Option[]): void;
}
