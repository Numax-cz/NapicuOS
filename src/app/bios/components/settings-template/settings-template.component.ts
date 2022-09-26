import {Component, Input, OnInit} from '@angular/core';
import {BiosComponent} from '../bios/bios.component';
import {Informations} from '../../interface/Informations';
import {settings} from '../../interface/ToolSettings';
import {isDate, isOption, isOptionsFast, isTime} from '../../Scripts/Type';
import {objectKeys} from 'src/app/bios/Scripts/objectKeys';

@Component({
  selector: 'app-settings-template',
  templateUrl: './settings-template.component.html',
  styleUrls: ['./settings-template.component.scss'],
})
export class SettingsTemplateComponent implements OnInit {
  public static MainOption: settings[] = [];
  /**
   * Number that indicates which item from MainOption is selected
   */
  public static selected: number = 0;
  @Input() MainOption: any;
  @Input() MainOptionInfo: Informations[] = [];

  constructor() {
  }

  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }

  get localSelected(): number {
    return SettingsTemplateComponent.selected;
  }

  get CursorDisplay(): boolean {
    return BiosComponent.WindowFastOptionDisplay;
  }

  get ComponentTitle(): string {
    return SettingsTemplateComponent.MainOption[0].title;
  }

  get Description(): string {
    return SettingsTemplateComponent.MainOption[
      objectKeys(SettingsTemplateComponent.MainOption)[
        SettingsTemplateComponent.selected
        ]
      ].description;
  }

  static errorType(): string {
    console.error('Array Error');
    return '{[Bios_Main]TYPE ERROR}';
  }

  ngOnInit(): void {
    if (this.MainOption) {
      SettingsTemplateComponent.MainOption = this.MainOption.settings;
    }
    SettingsTemplateComponent.selected = 0;
  }

  ngOnDestroy(): void {
    SettingsTemplateComponent.MainOption = [];
  }

  public isOption(component: settings): boolean {
    return isOption(component);
  }

  public isTime(component: settings): boolean {
    return isTime(component);
  }

  public isDate(component: settings): boolean {
    return isDate(component);
  }

  public isOptionFast(component: settings): boolean {
    return isOptionsFast(component);
  }

  objectKeys(obj: any): any {
    return Object.keys(obj);
  }
}
