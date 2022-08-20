export class HistoryLogger<T>{

  public historyItems: T[] = [];

  public selectedItem: number = 0;

  protected destroyNextHistory(): void {
    this.historyItems.splice(this.selectedItem + 1, this.historyItems.length);
  }

  public clear(): void {
    this.historyItems = [];
  }

  public add(item: T): void {
    if(this.selectedItem !== this.historyItems.length - 1 && this.historyItems.length) this.destroyNextHistory();
    this.historyItems.push(item);
    this.selectedItem = this.historyItems.length - 1;
  }

  public back(): void {
    if(this.canBack()) this.selectedItem -= 1;
  }

  public next(): void {
    if(this.canNext()) this.selectedItem += 1;
  }

  public canNext(): boolean{
    return (this.selectedItem + 1 !== this.historyItems.length)
  }

  public canBack(): boolean{
    return ((this.historyItems.length > 0) && this.selectedItem !== 0)
  }

  public get(): T{
    return this.historyItems[this.selectedItem];
  }
}
