import { Informations } from './Informations';
import { ToolSettings } from './ToolSettings';

export interface Screen {
  selected: number;
  MainOption: ToolSettings;
  MainOptionInfo?: Informations[]
}
