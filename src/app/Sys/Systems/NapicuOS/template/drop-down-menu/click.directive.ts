import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[napicuDropDownMenuClick]'
})
export class ClickDirective {
  @Output()
  public napicuMenuClick: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener("document:mousedown", ["$event"])
  public onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.napicuMenuClick.emit(event);
    }
  }

  constructor(private readonly elementRef: ElementRef) {
  }
}
