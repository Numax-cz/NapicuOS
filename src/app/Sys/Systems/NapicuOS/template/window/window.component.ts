import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
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
    this.setLeft(process, event.clientX);
    console.log(`Update: ${this.getLeft(process)} set to: ${event.clientX}`);
  }
  public moveWindowOut(): void {}

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
