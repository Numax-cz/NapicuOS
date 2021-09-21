export class System {
  public SystemRunning: boolean;
  declare boot: {
    title: string;
    logo: string;
  };
  constructor() {
    this.SystemRunning = false;
  }

  public Start(): void {
    this.SystemRunning = true;
  }
  public shutDown(): void {
    this.SystemRunning = false;
  }

  private onStartup(): void {}

  private onShutDown(): void {}
}
