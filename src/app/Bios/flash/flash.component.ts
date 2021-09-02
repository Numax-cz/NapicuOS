import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Current, Drive, Update } from '../../Array/FlashInformation';
import { BiosInfo } from '../../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { directories, Drives } from '../../interface/Directories';
import { FlashInformation } from '../../interface/FlashInformation';
import { OptionPanelComponent } from '../option-panel/option-panel.component';
import { Move } from '../../Scripts/Flash/Move';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  constructor() {}
  //TODO @Document
  public static Doc: Document;
  public static Scroll: HTMLElement;
  public static FlashingText: string;
  public static SelectedDir: number;
  public static ezFlashWindow: boolean;

  public static FlashDrive = Drive;
  public static SelectedWindow: number;
  public static SelectedFile: number;

  public static listDir: directories[];
  //Flash
  public static Flashing: boolean = true;
  /**
   * Saves browsing history
   */
  public static PathFile: directories[];

  //Winodw Alerts
  public static WindowAlert: boolean;
  public static WindowAlertOption: boolean;

  ngOnInit(): void {
    this.setEvents();
    var Scroll = document.getElementById('Scroll');
    if (Scroll) {
      FlashComponent.Doc = document;
      FlashComponent.Scroll = Scroll;
    }
    
    FlashComponent.SelectedDir = 0;
    FlashComponent.SelectedFile = 0;
    FlashComponent.SelectedWindow = 0;
    FlashComponent.Flashing = false;

    FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
    FlashComponent.PathFile = [];

    FlashComponent.WindowAlert = false;
    FlashComponent.WindowAlertOption = false;
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', Move, true);
    FlashComponent.ezFlashWindow = false;
    FlashComponent.Flashing = false;
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', Move, true);
    window.addEventListener('keydown', Move, true);
  }

  get Title(): string {
    return BiosInfo.title;
  }
  get Version(): string {
    return BiosInfo.version;
  }
  get Current(): FlashInformation {
    return Current;
  }
  get Update(): FlashInformation {
    return Update;
  }
  get Drive(): any[] {
    return FlashComponent.FlashDrive;
  }
  get File(): directories[] {
    return FlashComponent.listDir;
  }
  get SelectedDir(): number {
    return FlashComponent.SelectedDir;
  }
  get SelectedFile(): number {
    return FlashComponent.SelectedFile;
  }
  get LocationPath(): string {
    return FlashComponent.FlashDrive[FlashComponent.SelectedDir].title;
  }
  get Path(): directories[] {
    return FlashComponent.PathFile;
  }
  get PathFile(): directories[] {
    return FlashComponent.PathFile;
  }
  get SelectedWindow(): number {
    return FlashComponent.SelectedWindow;
  }
  get Flashing(): boolean {
    return FlashComponent.Flashing;
  }
  get FlashingText(): string {
    return FlashComponent.FlashingText;
  }
  get Display(): boolean {
    return OptionPanelComponent.window ? true : false;
  }
}
