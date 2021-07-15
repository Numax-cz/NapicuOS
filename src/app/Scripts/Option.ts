import { ComponentOption } from "../interface/ComponentOption";
import { SettingsOptions } from "../interface/SettingsOptions";

export function OptionsSelected(o: ComponentOption): string {
  var out: string = '';
  o.options.forEach((e: SettingsOptions) => {
    if (e.selected) {
      out = e.title;
      return;
    }
  });
  return out;
}
