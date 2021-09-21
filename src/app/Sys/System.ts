export class System {
  static SystemRunning: boolean;
  static boot: {
    title: string;
    logo: string;
  };
  constructor() {}

  public onStartup(): void {}
  public onShutDown(): void {}
}
