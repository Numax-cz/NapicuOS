import {Process} from "./Process";


export abstract class SystemProcess {

  public declare process: Process;

  public abstract interval: () => any;

  constructor(protected name: string, protected time: number) {
    this.process = new Process(
      {
        processTitle: this.name,
        processInterval: {
          fun: () => this.interval(),
          time: this.time
        }
      }
    );
  }

}
