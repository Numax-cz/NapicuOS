import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { copy } from 'src/app/Scripts/DeepClone';
import { Process } from 'src/app/Sys/Process';
import { getSystemProcess, SystemBoot } from '../../GET';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  //TODO DOC
  /**
   * Minimum window width in pixels
   */
  static readonly MinWindowWidth: number = 250;
  /**
   * Minimum window height in pixels
   */
  static readonly MinWindowHeight: number = 150;
  @Input() ApplicationProcess: Process[] = [];
  @ViewChild('Panel') declare panel: ElementRef;
  public move: boolean = false;
  public resize: boolean = false;
  protected originalX: number = 0;
  protected originalY: number = 0;

  protected declare originalMouseX: number;
  protected declare originalMouseY: number;

  protected declare originalWidth: number;
  protected declare originalHeight: number;

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
    console.log(getSystemProcess()); //TODO For Debug
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

    var x = MousevalueX + this.originalX;
    var y = MousevalueY + this.originalY;

    this.procesMove.Window.setLeft(x);
    this.procesMove.Window.setTop(y);
  }
  protected resizeWindow(event: MouseEvent): void {
    if (this.move || !this.resize) return;
    var MousevalueX: number = event.pageX;
    var MousevalueY: number = event.pageY;
    var x;
    var y;
    var left;
    var top;

    if (this.selectedDiv.classList.contains('bottom-right')) {
      x = this.originalWidth + (MousevalueX - this.originalMouseX);
      y = this.originalHeight + (MousevalueY - this.originalMouseY);
    } else if (this.selectedDiv.classList.contains('bottom-left')) {
      x = this.originalWidth - (MousevalueX - this.originalMouseX);
      y = this.originalHeight + (MousevalueY - this.originalMouseY);
      left = this.originalX + (MousevalueX - this.originalMouseX);
    } else if (this.selectedDiv.classList.contains('top-right')) {
      x = this.originalWidth + (MousevalueX - this.originalMouseX);
      y = this.originalHeight - (MousevalueY - this.originalMouseY);
      top = this.originalY + (MousevalueY - this.originalMouseY);
    } else {
      x = this.originalWidth - (MousevalueX - this.originalMouseX);
      y = this.originalHeight - (MousevalueY - this.originalMouseY);
      top = this.originalY + (MousevalueY - this.originalMouseY);
      left = this.originalMouseX + (MousevalueX - this.originalMouseX);
    }



    if (x > WindowComponent.MinWindowWidth) {
      this.procesMove.Window.setWidth(x);
      if (left) this.procesMove.Window.setLeft(left);
    }
    if (y > WindowComponent.MinWindowHeight) {
      this.procesMove.Window.setHeight(y);
      if (top) this.procesMove.Window.setTop(top);
    }
  }

  public resizersIn(process: Process, event: MouseEvent): void {
    this.resize = true;
    this.procesMove = process;
    this.originalMouseX = event.pageX;
    this.originalMouseY = event.pageY;

    this.originalWidth = process.Window.getWidth();
    this.originalHeight = process.Window.getHeight();

    this.originalX = process.Window.getLeft();
    this.originalY = process.Window.getTop();
    this.selectedDiv = event.target as HTMLElement;
  }

  public moveWindowIn(process: Process, event: MouseEvent): void {
    this.originalX = process.Window.getLeft() - event.pageX;
    this.originalY = process.Window.getTop() - event.pageY;
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
