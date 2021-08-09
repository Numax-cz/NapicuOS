import { Component, Input, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { Informations } from '../interface/Informations';
import { settings, ToolSettings } from '../interface/ToolSettings';
import { isOption, isTime, isDate, isOptionsFast } from '../Scripts/Type';

@Component({
  selector: 'app-settings-template',
  templateUrl: './settings-template.component.html',
  styleUrls: ['./settings-template.component.scss'],
})
export class SettingsTemplateComponent implements OnInit {
  @Input() MainOption: any;
  @Input() MainOptionInfo: Informations[] = [];
  public static MainOption: settings[] = [];
  /**
   * Number that indicates which item from MainOption is selected
   */
  public static selected: number = 0;

  constructor() {}
  ngOnInit(): void {
    SettingsTemplateComponent.MainOption = this.MainOption.settings;
    SettingsTemplateComponent.selected = 0;
  }

  ngOnDestroy(): void{
    SettingsTemplateComponent.MainOption = [];
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
    return SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].description;
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
  static errorType(): string {
    console.error('Array Error');
    return '{[Bios_Main]TYPE ERROR}';
  }
}
