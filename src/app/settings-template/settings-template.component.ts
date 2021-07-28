import { Component, Input, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { settings } from '../interface/ToolSettings';
import { isOption, isTime, isDate } from '../Scripts/Type';

@Component({
  selector: 'app-settings-template',
  templateUrl: './settings-template.component.html',
  styleUrls: ['./settings-template.component.scss'],
})
export class SettingsTemplateComponent implements OnInit {
  @Input() MainOption: any;
  public static MainOption: settings[] = [];
  public static selected: number = 0;

  constructor() {}
  ngOnInit(): void {
    SettingsTemplateComponent.MainOption = this.MainOption.settings;
    SettingsTemplateComponent.selected = 0;
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

  public isOption(component: settings, index: number): boolean {
    return isOption(component, index);
  }
  public isTime(component: settings): boolean {
    return isTime(component);
  }
  public isDate(component: settings): boolean {
    return isDate(component);
  }
  static errorType(): string {
    console.error('Array Error');
    return '{[Bios_Main]TYPE ERROR}';
  }
}
