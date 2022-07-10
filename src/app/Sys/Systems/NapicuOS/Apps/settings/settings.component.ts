import {Component, OnInit} from '@angular/core';
import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {SYSTEM_APPS_SETTINGS_OPTIONS} from "../../config/Apps/Settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public options: SettingsOptionsMetadata[] = SYSTEM_APPS_SETTINGS_OPTIONS;
  public selectedOption: number = 1;

  constructor() { }

  ngOnInit(): void {
  }


  public clickOption(index: number): void {
    this.selectedOption = index;
  }

}
