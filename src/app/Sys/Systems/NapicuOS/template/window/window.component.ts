import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Process } from 'src/app/Sys/Process';
import { SystemBoot } from '../../GET';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() ApplicationProcess: Process[] = [];
  public win: any;
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {}

  public close(process: Process): void {
    //TODO nezobrazuje se, protože je display (Window) na Flase
    // console.log(this.doc.getElementById('napicuos-App-window'));
    // process.Window.close();
  }

  public full(process: Process): void {}

  public minimized(process: Process): void {}

  public moveWindow(): void {}

  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
