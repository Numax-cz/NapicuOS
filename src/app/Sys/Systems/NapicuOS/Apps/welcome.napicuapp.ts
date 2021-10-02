import { Process } from 'src/app/Sys/Process';

export class Welcome extends Process {
  public title: string = 'NapicuAPP';

  public readonly Run = (): void => {};
  public readonly Close = (): void => {};
}