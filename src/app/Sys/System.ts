export class System {
  public SystemRunning: boolean;
  public static Title: string;
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

  protected onStartup(): void {}

  protected onShutDown(): void {}
}
