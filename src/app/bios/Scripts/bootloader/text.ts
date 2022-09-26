import {BlackscreenComponent} from 'src/app/bios/components/blackscreen/blackscreen.component';
import {CursorAnimationIN, CursorAnimationTimeIn, CursorMoveDown,} from 'src/app/bios/Config/Animation/animationCursor';

export function setDisplayText(text: string[], index?: number): void {
  if (index && BlackscreenComponent.text[index]) {
    BlackscreenComponent.text[index] = text[0];
  } else {
    BlackscreenComponent.text = text;
  }
}

//TODO
//? Class
//? In Function

export class animationCursor {
  /**
   * Interval for blinking cursor
   */
  protected interval: any;

  constructor() {
  }

  /**
   * Starts a blinking cursor animation
   */
  public blinking(): void {
    setDisplayText(['']);
    this.interval = setInterval(() => {
      setTimeout(() => {
        // if (BlackscreenComponent.text[BlackscreenComponent.text.length - 1] === '_') return;
        if (
          BlackscreenComponent.text[BlackscreenComponent.text.length - 1] ===
          '_'
        ) {
          BlackscreenComponent.text.splice(
            BlackscreenComponent.text.length - 1,
            1
          );
          return;
        }
        BlackscreenComponent.text.push('_');
        setTimeout(() => {
          BlackscreenComponent.text.splice(
            BlackscreenComponent.text.length - 1,
            1
          );
        }, 500);
      }, CursorAnimationTimeIn);
    }, CursorAnimationIN);
  }

  /**
   * Moves the cursor down in blackscreen
   */
  public moveDown(fun?: Function): void {
    var i: number = 0;
    var maxTime: number = 15;
    var id: any;
    id = setInterval(() => {
      if (i <= maxTime) {
        BlackscreenComponent.text.unshift(' ');
        i++;
      } else {
        clearInterval(id);
        if (fun) fun();
      }
    }, CursorMoveDown);
  }

  /**
   * Stop blinking (Deletes the interval function)
   */
  public stop(): void {
    clearInterval(this.interval);
  }
}
