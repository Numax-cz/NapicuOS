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
  public resize: boolean = false;
  protected X: number = 0;
  protected Y: number = 0;
  public declare selectedDiv: HTMLElement;
  protected declare procesMove: Process;
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    window.addEventListener('mouseup', () => {
      this.moveWindowOut();
    });
    window.addEventListener('mousemove', (event: any) => {
      this.moveWindow(event);
      this.resizeWindow(event);
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

  protected moveWindow(event: MouseEvent): void {
    if (!this.move || this.resize) return;
    var MousevalueX = event.pageX; 
    var MousevalueY = event.pageY; 

    var x = Math.round(MousevalueX + this.X);
    var y = Math.round(MousevalueY + this.Y);

    this.procesMove.Window.setLeft(percentage(x, window.innerWidth));
    this.procesMove.Window.setTop(percentage(y, window.innerHeight));
  }
  protected resizeWindow(event: MouseEvent): void {
    if (this.move || !this.resize) return;
    var MousevalueX = event.pageX; 
    var MousevalueY = event.pageY; 
    if (this.selectedDiv.classList.contains('bottom-right')) {
      var x = percentage(MousevalueX, window.innerWidth) - this.procesMove.Window.getLeft();
      var y = percentage(MousevalueY, window.innerHeight) - this.procesMove.Window.getTop();
      this.procesMove.Window.setWidth(x);
      this.procesMove.Window.setHeight(y);
    }
  }

  public resizersIn(process: Process, event: MouseEvent): void {
    this.resize = true;
    this.procesMove = process;
    this.selectedDiv = event.target as HTMLElement;
  }

  public moveWindowIn(process: Process, event: MouseEvent): void {
    this.X = percentageValue(process.Window.getLeft(), window.innerWidth) - event.clientX;
    this.Y = percentageValue(process.Window.getTop(), window.innerHeight) - event.clientY;
    this.move = true;
    this.procesMove = process;
    event.stopPropagation();
  }
  public moveWindowOut(): void {
    this.move = false;
    this.resize = false;
  }

  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
