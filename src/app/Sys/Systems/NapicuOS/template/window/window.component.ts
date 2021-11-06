import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';

import { Process } from 'src/app/Sys/Process';
import { SystemBoot } from '../../GET';
import { percentage, percentageValue } from '../../scripts/getPercentage';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() ApplicationProcess: Process[] = [];
  @ViewChild('Panel') declare panel: ElementRef;
  public move: boolean = false;
  protected x: number = 0;
  protected y: number = 0;
  protected declare procesMove: Process;
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    window.addEventListener('mouseup', () => {
      this.moveWindowOut();
    });
    window.addEventListener('mousemove', (event: any) => {
      this.moveWindow(event);
    });
  }

  public close(process: Process, event: Event): void {
    process.Window.close();
    event.stopPropagation();
  }

  public full(process: Process, event: Event): void {
    event.stopPropagation();
  }

  public minimized(process: Process, event: Event): void {
    event.stopPropagation();
  }

  public moveWindow(event: any): void {
    if (!this.move) return;
    var MousevalueX = event.clientX;
    var MousevalueY = event.clientY;

    var x = Math.round(MousevalueX + this.x);
    var y = Math.round(MousevalueY + this.y);

    this.procesMove.Window.setLeft(percentage(x, window.innerWidth));
    this.procesMove.Window.setTop(percentage(y, window.innerHeight));
  }
  public moveWindowIn(process: Process, event: any): void {
    this.x = percentageValue(process.Window.getLeft(), window.innerWidth) - event.clientX;
    this.y = percentageValue(process.Window.getTop(), window.innerHeight) - event.clientY;
    this.move = true;
    this.procesMove = process;
    event.stopPropagation();
  }
  public moveWindowOut(): void {
    this.move = false;
  }

  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
