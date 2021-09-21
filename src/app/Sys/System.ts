export class System {
  public SystemRunning: boolean;
  constructor() {
    this.SystemRunning = false;
  }

  public onStartup(): void {
    this.SystemRunning = true;
  }
  public onShutDown(): void {
    this.SystemRunning = false;
  }
}

class NapicuOS extends System {}

let Napicu = new NapicuOS();
