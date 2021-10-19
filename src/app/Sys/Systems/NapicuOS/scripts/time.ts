import { Process } from 'src/app/Sys/Process';
import { NapicuOS } from '../system.napicuos';

export class time extends Process {
  override Interval = setInterval(() => {
    NapicuOS.systemTime = NapicuOS.getTime();
  }, 1000);
}
