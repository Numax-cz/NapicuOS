import { Component, OnInit } from '@angular/core';
import { Current, Drive, Update } from '../Array/FlashInformation';
import { BiosInfo } from '../Array/ToolSettings';
import { FlashInformation } from '../interface/FlashInformation';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  constructor() {}
  public static SelectedDir: number;
  public static ezFlashWindow: boolean;

  ngOnInit(): void {
    FlashComponent.SelectedDir = 0;
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
    return Drive;
  }
  get SelectedDir(): number {
    return FlashComponent.SelectedDir;
  }
}
