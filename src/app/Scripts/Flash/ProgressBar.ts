import { FlashingText } from 'src/app/Array/FlashInformation';
import { FlashComponent } from 'src/app/flash/flash.component';

export function ProgressBar(time: number, htmlID: string, callback: () => void, max?: number): void {
  FlashComponent.Flashing = true;
  var bar = FlashComponent.Doc.getElementById(htmlID);
  if (!bar) {
    console.error('Progress Bar ID is null');
    return;
  }
  var MaxLoad: number = max || 100;
  var i = 0;
  if (bar) {
    if (i == 0) {
      i = 1;
      var width = 10;
      var id = setInterval(frame, time);
      function frame() {
        var d = Math.random();
        if (d < 0.5) {
          setTimeout(() => {
            Move();
          }, time * 8);
        } else if (d < 0.7) {
          setTimeout(() => {
            Move();
          }, time * 11);
        } else {
          Move();
        }
        function Move() {
          if (width >= MaxLoad) {
            clearInterval(id);
            //TODO Exit witch setTimeOut
            if (i == 0) return;
            i = 0;
            if (FlashComponent.ezFlashWindow) {
              callback();
            }
          } else {
            width++;
            if (bar) bar.style.width = width + '%';
          }
        }
      }
    }
  }
}

//Restart
