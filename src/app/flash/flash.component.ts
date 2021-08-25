import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Current, Drive, Update } from '../Array/FlashInformation';
import { BiosInfo } from '../Array/ToolSettings';
import { directories, Drives } from '../interface/Directories';
import { FlashInformation } from '../interface/FlashInformation';


@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  constructor() {}
  //TODO @Document
  public static ProgressBar: HTMLElement;
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

  ngOnInit(): void {
    var id = document.getElementById('Bar');
    var id2 = document.getElementById('Scroll');
    if (id && id2) {
      FlashComponent.ProgressBar = id;
      FlashComponent.Scroll = id2;
    }

    FlashComponent.SelectedDir = 0;
    FlashComponent.SelectedFile = 0;
    FlashComponent.SelectedWindow = 0;
    FlashComponent.Flashing = false;

    FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
    FlashComponent.PathFile = [];
  }
  ngOnDestroy(): void {
    FlashComponent.ezFlashWindow = false;
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
}
