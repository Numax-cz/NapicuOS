import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { copy } from 'src/app/Scripts/DeepClone';
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
  public move: boolean = false;
  public resize: boolean = false;
  protected X: number = 0;
  protected Y: number = 0;
  protected originalMouseX: number= 0
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

    var x = MousevalueX + this.X;
    var y = MousevalueY + this.Y;
 
    
    this.procesMove.Window.setLeft(x);
    this.procesMove.Window.setTop(y);
  }
  protected resizeWindow(event: MouseEvent): void {
    if (this.move || !this.resize) return;
    var MousevalueX = event.pageX;
    var MousevalueY = event.pageY;
    var x;
    var y;
    var left;
    if (this.selectedDiv.classList.contains('bottom-right')) {
      x = MousevalueX - this.procesMove.Window.getLeft();
      y = MousevalueY - this.procesMove.Window.getTop();
    } else if (this.selectedDiv.classList.contains('bottom-left')) {
      x = MousevalueX + this.procesMove.Window.getLeft();
      y = MousevalueY - this.procesMove.Window.getTop();
      left = this.procesMove.Window.getLeft() - (MousevalueX + this.originalMouseX);
   

      
    }
    if (!x || !y) return;
    this.procesMove.Window.setWidth(x);
    this.procesMove.Window.setHeight(y);
    if(left) this.procesMove.Window.setLeft(left);
  }


  public resizersIn(process: Process, event: MouseEvent): void {
    this.resize = true;
    this.procesMove = process;
    this.originalMouseX = event.pageX
    this.X = process.Window.getLeft();
    this.selectedDiv = event.target as HTMLElement;
  }

  public moveWindowIn(process: Process, event: MouseEvent): void {
    this.X = process.Window.getLeft() - event.pageX;
    this.Y = process.Window.getTop() - event.pageY;
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
