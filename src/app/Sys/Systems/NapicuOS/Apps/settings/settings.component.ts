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

  constructor() { }

  ngOnInit(): void {
  }

  public static disableEvent(): void {
    this.event = false;
  }

  public static allowEvent(): void {
    this.event = true;
  }

  public clickOption(index: number): void {
    this.selectedOption = index;
  }

  get GetAllowEvent(): boolean {
    return SettingsComponent.event;
  }

  get GetOptions(): SettingsOptionsMetadata[]{
    return SYSTEM_APPS_SETTINGS_OPTIONS;
  }
}
