import {SettingsTemplateComponent} from '../Bios/settings-template/settings-template.component';
import {settings} from '../interface/ToolSettings';
import {objectKeys} from './objectKeys';

/**
 *
 * @returns Returns the selected item
 */
export function getSelectedItem(): settings {
  return SettingsTemplateComponent.MainOption[
    objectKeys(SettingsTemplateComponent.MainOption)[
      SettingsTemplateComponent.selected
      ]
    ];
}
