import {Process} from "./Process";
import {AppCreatMetadata} from "../interface/System";
import {NapicuOS} from "../system.napicuos";


export abstract class SystemProcess {

  public declare process: Process;

  public abstract interval(): void;

  constructor(protected name: string, protected time: number) {
    this.process = new Process(
      {
        processTitle: this.name,
        processInterval: {
          fun: this.interval,
          time: this.time
        }
      }
    );
  }

}
