import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Process } from 'src/app/Sys/Process';
import { SystemBoot } from '../../GET';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() ApplicationProcess: Process[] = [];
  @ViewChild('Panel') declare panel: ElementRef;
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {}

  public close(process: Process, event: Event): void {
    //TODO nezobrazuje se, protože je display (Window) na Flase
    // console.log(this.doc.getElementById('napicuos-App-window'));
    // process.Window.close();
    event.stopPropagation();
  }

  public full(process: Process, event: Event): void {
    event.stopPropagation();
  }

  public minimized(process: Process, event: Event): void {
    event.stopPropagation();
  }

  public moveWindow(): void {}

  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
