import { Component, Input, OnInit } from '@angular/core';
import { Process } from 'src/app/Sys/Process';
import { SystemBoot } from '../../GET';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() ApplicationProcess: Process[] = [];
  constructor() {}

  ngOnInit(): void {}

  public close(process: Process): void {
    process.Window.close();
  }
  public full(process: Process): void {}
  public minimized(process: Process): void {}

  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
