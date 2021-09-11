import { BootComponent } from '../Bios/boot/boot.component';
import { settings, struc } from '../interface/ToolSettings';
import { maxMinutes, maxSeconds, maxHours } from './TimeDateSet';

/**
 * Sets the correct tick of the clock
 * @param {settings} MainOption
 * @param {number} index
 */
export function TimeInterval(MainOption: settings[], index: number): void {
  if (BootComponent.EnterBios) {
    var time = MainOption[index].time;
    if (time) {
      var seconds = Number(time[2].title) + 1;
      var minutes = Number(time[1].title) + 1;
      var hours = Number(time[0].title) + 1;

      if (seconds >= maxSeconds) {
        time[2].title = '0';
        if (minutes >= maxMinutes) {
          time[0].title = '0';
          time[1].title = '0';
          if (hours >= maxHours) {
            for (let i = 0; i < time.length; i++) {
              time[i].title = '0';
            }
          } else {
            time[0].title = hours.toString();
          }
        } else {
          time[1].title = minutes.toString();
        }
      } else {
        time[2].title = seconds.toString();
      }
    }
  } else {
    clearTimeInterval(MainOption, index);
  }
}

/**
 * Sets for MainOption[index].interval setInterval..1000ms => TimeInterval
 * @param {settings} MainOption
 * @param {number} index
 */
export function setTimeInterval(MainOption: settings[], index: number): void {
  if (!MainOption[index].interval) {
    MainOption[index].interval = setInterval(() => {
      TimeInterval(MainOption, index);
    }, 1000);
  }
}

/**
 * Clears MainOption[index].interval
 * @param {settings} MainOption
 * @param {number} index
 */
export function clearTimeInterval(MainOption: settings[], index: number): void {
  clearInterval(MainOption[index].interval);
  MainOption[index].interval = null;
}
