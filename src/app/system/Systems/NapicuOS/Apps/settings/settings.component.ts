import {Component, OnInit} from '@angular/core';
import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {SYSTEM_APPS_SETTINGS_OPTIONS} from "../../config/Apps/Settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public selectedOption: number = 0;
  protected static event: boolean = true;
  public static declare setting_items: SettingsOptionsMetadata[];

  constructor() { }

  ngOnInit(): void {
    SettingsComponent.update_setting_items();
  }

  public static update_setting_items(): void {
    SettingsComponent.setting_items = SYSTEM_APPS_SETTINGS_OPTIONS();
  }

  public static disableEvent(): void {
    this.event = false;
  }

  public static allowEvent(): void {
    this.event = true;
  }

  public clickOption(index: number): void {
    this.selectedOption = index;
    SettingsComponent.update_setting_items();
  }

  get GetAllowEvent(): boolean {
    return SettingsComponent.event;
  }

  get GetSystemItems(): SettingsOptionsMetadata[]{
    return SettingsComponent.setting_items;
  }
}
