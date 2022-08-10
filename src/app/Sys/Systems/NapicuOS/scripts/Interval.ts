export class Interval {
  protected interval_cache: number = 0;

  public delay (fun: Function): void {
    clearTimeout(this.interval_cache)
    this.interval_cache = setTimeout(() => fun(), 500);
  }
}
