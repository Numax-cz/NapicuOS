export class Process {
  public title: string = 'NapicuAPP';
  public readonly Run = (): void => {};
  public readonly Close = (): void => {};

  public onRun(): void {}

  public onClose(): void {}
}
