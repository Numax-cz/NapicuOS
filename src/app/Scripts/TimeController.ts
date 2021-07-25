import { settings, ToolSettings } from '../interface/ToolSettings';
import { maxMinutes, maxSeconds, maxHours } from './TimeDateSet';

export function TimeInterval(MainOption: settings[], index: number): void {
  var seconds = Number(MainOption[index].time[2].title) + 1;
  var minutes = Number(MainOption[index].time[1].title) + 1;
  var hours = Number(MainOption[index].time[0].title) + 1;

  if (seconds >= maxSeconds) {
    MainOption[index].time[2].title = '0';
    if (minutes >= maxMinutes) {
      MainOption[index].time[0].title = '0';
      if (hours >= maxHours) {
        for (let i = 0; i < MainOption[index].time.length; i++) {
          MainOption[index].time[i].title = '0';
        }
      }
    } else {
      MainOption[index].time[1].title = minutes.toString();
    }
  } else {
    MainOption[index].time[2].title = seconds.toString();
  }
}

export function setTimeInterval(MainOption: settings[], index: number): void {
  if (!MainOption[index].interval) {
    MainOption[index].interval = setInterval(() => {
      TimeInterval(MainOption, index);
    }, 1000);
  }
}

export function clearTimeInterval(MainOption: settings[], index: number): void {
  clearInterval(MainOption[index].interval);
  MainOption[index].interval = null;
}
