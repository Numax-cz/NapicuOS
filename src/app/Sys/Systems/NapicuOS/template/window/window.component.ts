import { trigger, transition, style, animate, state } from '@angular/animations';
import { CompileNgModuleSummary } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { withModule } from '@angular/core/testing';
import { filter } from 'rxjs';
import { Process } from 'src/app/Sys/Process';
import { window_animations } from '../../config/windowAnimations';
import { getSystemDisplayedWindowApps, getSystemProcess, getSystemWindowApps, SystemBoot } from '../../GET';
import { percentage, percentageValue } from '../../scripts/getPercentage';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  animations: [
    trigger('NapicuOSWindowAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate(window_animations, style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate(window_animations, style({ transform: 'scale(0)' })),
      ]),
      state(
        'true',
        style({
          width: '100%',
          height: '100%',
          top: '0%',
          left: '0%',
        })
      ),
      state(
        'false',
        style({
          width: '{{width}}%',
          height: '{{height}}%',
          top: '{{top}}%',
          left: '{{left}}%',
        }),
        { params: { width: 0, height: 0, top: 0, left: 0 } }
      ),

      transition(`*=>true`, animate(window_animations)),
      transition(`*=>false`, animate(window_animations)),
    ]),
  ],
})
export class WindowComponent implements OnInit {
  @Input() ApplicationProcess: Process[] = [];
  @ViewChild('Panel') declare panel: ElementRef;
  /**
   * Minimum window width in pixels
   */
  static readonly MinWindowWidth: number = 250;
  /**
   * Minimum window height in pixels
   */
  static readonly MinWindowHeight: number = 150;
  /**
   * Specifies whether the window can be moved
   */
  public move: boolean = false;
  /**
   * Specifies whether the window can be resized
   */
  public resize: boolean = false;
  /**
   * Specifies whether the window is maximized
   */
  public maximized: boolean = false;
  /**
   * Original window X location
   */
  protected originalX: number = 0;
  //TODO DOC
  public topFocusWindow: boolean = false;
  public rightFocusWindow: boolean = false;
  public leftFocusWindow: boolean = false;
  /**
   * Original window Y location
   */
  protected originalY: number = 0;
  /**
   * Original mouse location X
   */
  protected declare originalMouseX: number;
  /**
   * Original mouse location Y
   */
  protected declare originalMouseY: number;
  /**
   * Original window width
   */
  protected declare originalWidth: number;
  /**
   * Original window height
   */
  protected declare originalHeight: number;
  /**
   * Specifies the selected window border when resizing
   */
  public declare selectedDiv: HTMLElement;
  /**
   * Specifies the selected application window
   */
  protected declare procesMove: Process;

  protected declare lastWindowIndex: number;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('mouseup', () => {
      this.WindowOut();
      if (this.leftFocusWindow) {
        this.setAllWindowPar(window.innerWidth / 2, window.outerHeight);
      } else if (this.rightFocusWindow) {
        this.setAllWindowPar(window.innerWidth / 2, window.outerHeight, window.innerWidth / 2);
      }
    });
    window.addEventListener('mousemove', (event: any) => {
      this.moveWindow(event);
      this.resizeWindow(event);
    });
    window.addEventListener('mousedown', (e: MouseEvent) => {
      var p = e.target as HTMLElement;

      if (p.offsetParent?.id !== 'napicuos-App-window' && this.procesMove.Window.activated) {
        this.procesMove.Window.activated = false;
      }
    });
  }

  /**
   * Function that closes the application window
   * @param process
   * @param event
   */
  public close(process: Process, event: MouseEvent): void {
    process.Window.close();
    event.stopPropagation();
  }

  /**
   * Function that maximizes or minimizes the window
   * @param event - The mouse event
   */
  public maximize(event: MouseEvent): void {
    this.maximized = this.maximized ? false : true;
    event.stopPropagation();
  }

  /**
   * Function that minimizes the window into a bar
   * @param event - The mouse event
   */
  public minimized(event: MouseEvent): void {
    event.stopPropagation();
  }

  public SystemActivated(i: Process): boolean {
    return i.Window?.activated;
  }

  /**
   *  Functions for moving the application window
   * @param event - The mouse event
   */
  protected moveWindow(event: MouseEvent): void {
    const MousevalueX = event.pageX;
    const MousevalueY = event.pageY;
    this.leftFocusWindow = MousevalueX <= 0 ? true : false;
    this.rightFocusWindow = MousevalueX + 2 >= window.outerWidth ? true : false;
    this.topFocusWindow = MousevalueY <= 0 ? true : false;

    if (!this.move || this.resize) return;

    if (this.maximized) {
      var perNowX = percentageValue(
        percentage(MousevalueX, window.innerWidth),
        this.procesMove.Window.getWidth()
      );
      this.originalX = -perNowX;
      var perNowY = percentageValue(
        percentage(event.screenY - MousevalueY, window.innerHeight),
        this.procesMove.Window.getHeight()
      );
      this.originalY = -perNowY;

      this.maximized = false;
    }

    if (MousevalueX <= 0) {
      console.log(event);
    } else if (MousevalueX + 2 >= window.outerWidth) {
    }

    var x = MousevalueX + this.originalX;
    var y = MousevalueY + this.originalY;

    this.procesMove.Window.setTop(y);

    this.procesMove.Window.setLeft(x);
  }

  /**
   * Function to enlarge/reduce the window along the edges of the application window
   * @param event - The mouse event
   */
  protected resizeWindow(event: MouseEvent): void {
    if (this.maximized) return;

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
    } else if (this.selectedDiv.classList.contains('top-left')) {
      x = this.originalWidth - (MousevalueX - this.originalMouseX);
      y = this.originalHeight - (MousevalueY - this.originalMouseY);
      top = this.originalY + (MousevalueY - this.originalMouseY);
      left = this.originalMouseX + (MousevalueX - this.originalMouseX);
    } else if (this.selectedDiv.classList.contains('right')) {
      x = this.originalWidth + (MousevalueX - this.originalMouseX);
    } else if (this.selectedDiv.classList.contains('left')) {
      x = this.originalWidth - (MousevalueX - this.originalMouseX);
      left = this.originalX + (MousevalueX - this.originalMouseX);
    } else if (this.selectedDiv.classList.contains('bottom')) {
      y = this.originalHeight + (MousevalueY - this.originalMouseY);
    } else {
      y = this.originalHeight - (MousevalueY - this.originalMouseY);
      top = this.originalY + (MousevalueY - this.originalMouseY);
    }
    if (x && x > WindowComponent.MinWindowWidth) {
      this.procesMove.Window.setWidth(x);
      if (left) this.procesMove.Window.setLeft(left);
    }
    if (y && y > WindowComponent.MinWindowHeight) {
      this.procesMove.Window.setHeight(y);
      if (top) this.procesMove.Window.setTop(top);
    }
  }

  public activeWindow(i: Process, index: number): void {
    if (this?.lastWindowIndex !== index) {
      if (this.procesMove) this.procesMove.Window.activated = false;
    }
    // var windows = getSystemDisplayedWindowApps();
    // windows.slice(index, 1);
    // windows.push(i);
    // windows.forEach((element: Process, index: number) => {
    //   element.Window.appData.z_index = index;
    // });

    this.procesMove = i;
    i.Window.activated = true;
    this.lastWindowIndex = index;
  }

  /**
   * Functions for saving parameters
   * @param process
   * @param event - The mouse event
   */
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
  /**
   * Functions for saving parameters
   * @param process
   * @param event - The mouse event
   */
  public moveWindowIn(process: Process, event: MouseEvent): void {
    this.originalX = process.Window.getLeft() - event.pageX;
    this.originalY = process.Window.getTop() - event.pageY;
    this.move = true;
    this.procesMove = process;
    event.stopPropagation();
  }

  protected setAllWindowPar(width: number, height: number, left?: number): void {
    if (!left) left = 0;
    this.procesMove.Window.setTop(0);
    this.procesMove.Window.setLeft(left);
    this.procesMove.Window.setWidth(width);
    this.procesMove.Window.setHeight(height);
  }
  /**
   * Function to cancel active events when
   */
  public WindowOut(): void {
    this.move = false;
    this.resize = false;
  }
  /**
   * Application process rollback function
   */
  get AppProcess(): any {
    return this.ApplicationProcess;
  }
  /**
   * Returns whether the system has been started
   */
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
