import { BiosSettings } from 'src/app/Array/ToolSettings';
import { settings, ToolSettings } from 'src/app/interface/ToolSettings';
import { setDate, setTime } from '../TimeDate';
import { isDate, isOption, isOptionsFast, isTime } from '../Type';

export function LoadDefaults(): void {
  setDefaultOptions();
}

function setDefaultOptions(): void {
  Object.values(BiosSettings).forEach((ArrayValue: ToolSettings) => {
    Object.values(ArrayValue.settings).forEach((Settings: settings) => {
      if (isOption(Settings)) {
        Settings.selected = 0;
      } else if (isTime(Settings)) {
        Settings.time = setTime();
      } else if (isDate(Settings)) {
        Settings.date = setDate();
      } else if (!isOptionsFast(Settings)) {
        console.error('LoadDefaults.ts => No input matches');
      }
    });
  });
}
