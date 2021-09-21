export class System {
  public SystemRunning: boolean;
  declare boot: {
    title: string;
    logo: string;
  };
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
