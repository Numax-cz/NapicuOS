import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { CursorAnimationIN, CursorAnimationTimeIn } from 'src/app/Config/Animation/animationCursor';
import { setTimeInterval } from '../TimeController';

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
  //TODO constructor params
  protected interval: any;
  protected arrayText: string[] = [];
  constructor() {}

  blinking(): void {
    setDisplayText(['_']);
    this.interval = setInterval(() => {
      setDisplayText([' '], BlackscreenComponent.text.length - 1);
      setTimeout(() => {
        setDisplayText(['_'], BlackscreenComponent.text.length - 1);
      }, CursorAnimationTimeIn);
    }, CursorAnimationIN);
  }

  moveDown(): void {
    for (let i = 0; i < 10; i++) {
      BlackscreenComponent.text.unshift(" \n ")
    }
  }

  stop(): void {
    this.interval = undefined;
  }
}
