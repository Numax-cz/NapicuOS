import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingFlashComponent } from 'src/app/Config/Animation/Flash';
import { Process } from 'src/app/Sys/Process';
import { getSystemProcess, SystemBoot } from '../../GET';
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

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    window.addEventListener('mouseout', () => {
      this.move = false;
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

  public moveWindow(process: Process, event: any): void {
    if (!this.move) return;
    var MousevalueX = event.clientX;
    var MousevalueY = event.clientY;

    var x = MousevalueX + this.x;
    var y = MousevalueY + this.y;

    this.setLeft(process, percentage(x, window.innerWidth));
    this.setTop(process, percentage(y, window.innerHeight));
  }
  public moveWindowIn(process: Process, event: any): void {
    this.x = percentageValue(this.getLeft(process), window.innerWidth) - event.clientX;
    this.y = percentageValue(this.getTop(process), window.innerHeight) - event.clientY;

    this.move = true;
    event.stopPropagation();
  }

  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }

  public getTop(process: Process): number {
    return process.Window.appData.posY;
  }
  public getLeft(process: Process): number {
    return process.Window.appData.posX;
  }
  public getWidth(process: Process): number {
    return process.Window.appData.width;
  }
  public getHeight(process: Process): number {
    return process.Window.appData.height;
  }

  public setTop(process: Process, value: number): void {
    process.Window.appData.posY = value;
  }
  public setLeft(process: Process, value: number): void {
    process.Window.appData.posX = value;
  }
  public setWidth(process: Process, value: number): void {
    process.Window.appData.width = value;
  }
  public setHeight(process: Process, value: number): void {
    process.Window.appData.height = value;
  }
}
