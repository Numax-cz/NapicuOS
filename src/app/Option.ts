import { Option } from './interface/Option';
import { BiosOption } from './interface/BiosOption';
export function OptionsSelected(o: Option): string {
  var out: string = '';
  o.options.forEach((e: BiosOption) => {
    if (e.selected) {
      out = e.title;
      return;
    }
  });
  return out;
}
