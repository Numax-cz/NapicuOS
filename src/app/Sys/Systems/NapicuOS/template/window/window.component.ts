import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { throwIfEmpty, windowToggle } from 'rxjs';
import { Process } from 'src/app/Sys/Process';
import { Window } from 'src/app/Sys/Window';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { window_animations } from '../../config/windowAnimations';
import { percentage, percentageValue } from '../../scripts/getPercentage';
import { NapicuOS } from '../../system.napicuos';

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
  /**
   * History of overlay windows
   */
  public static WindowHistory: Window[] = [];
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
  protected declare procesMove: Window;

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

      if (p.offsetParent?.id !== 'napicuos-App-window' && this.procesMove.activated) {
        this.procesMove.activated = false;
      }
    });
  }

  /**
   * Function that closes the application window
   * @param Window
   * @param event
   */
  public close(window: Window, event: MouseEvent): void {
    window.close();
    event.stopPropagation();
  }

  /**
   * Function that maximizes or minimizes the window
   * @param event - The mouse event
   */
  public maximize(window: Window, event: MouseEvent): void {
    window.appData.maximized = window.appData.maximized ? false : true;
    event.stopPropagation();
  }

  /**
   * Function that minimizes the window into a bar
   * @param event - The mouse event
   */
  public minimized(event: MouseEvent): void {
    event.stopPropagation();
  }

  public SystemActivated(i: Window): boolean {
    return i?.activated;
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
      var perNowX = percentageValue(percentage(MousevalueX, window.innerWidth), this.procesMove.getWidth());
      this.originalX = -perNowX;
      var perNowY = percentageValue(
        percentage(event.screenY - MousevalueY, window.innerHeight),
        this.procesMove.getHeight()
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

    this.procesMove.setTop(y);

    this.procesMove.setLeft(x);
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
      this.procesMove.setWidth(x);
      if (left) this.procesMove.setLeft(left);
    }
    if (y && y > WindowComponent.MinWindowHeight) {
      this.procesMove.setHeight(y);
      if (top) this.procesMove.setTop(top);
    }
  }

  public activeWindow(i: Window, index: number): void {
    if (this.procesMove?.activated) this.procesMove.activated = false;

    // var x = copy(WindowComponent.UI) as Window[];
    // x.slice(index, 1);
    // x.push(i);

    WindowComponent.WindowHistory.slice(index, 1);
    WindowComponent.WindowHistory.push(i);
    WindowComponent.WindowHistory.forEach((element: Window, index: number) => {
      element.appData.z_index = index;
    });

    this.procesMove = i;
    i.activated = true;
  }

  /**
   * Functions for saving parameters
   * @param Window
   * @param event - The mouse event
   */
  public resizersIn(process: Window, event: MouseEvent): void {
    this.resize = true;
    this.procesMove = process;
    this.originalMouseX = event.pageX;
    this.originalMouseY = event.pageY;

    this.originalWidth = process.getWidth();
    this.originalHeight = process.getHeight();

    this.originalX = process.getLeft();
    this.originalY = process.getTop();
    this.selectedDiv = event.target as HTMLElement;
  }
  /**
   * Functions for saving parameters
   * @param Window
   * @param event - The mouse event
   */
  public moveWindowIn(process: Window, event: MouseEvent): void {
    this.originalX = process.getLeft() - event.pageX;
    this.originalY = process.getTop() - event.pageY;
    this.move = true;
    this.procesMove = process;
    event.stopPropagation();
  }

  protected setAllWindowPar(width: number, height: number, left?: number): void {
    if (!left) left = 0;
    this.procesMove.setTop(0);
    this.procesMove.setLeft(left);
    this.procesMove.setWidth(width);
    this.procesMove.setHeight(height);
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
  get AppProcess(): Process[] {
    return NapicuOS.get_system_displayed_window_apps();
  }
  /**
   * Returns whether the system has been started
   */
  get SystemBoot(): boolean {
    return NapicuOS.get_system_boot();
  }
}
