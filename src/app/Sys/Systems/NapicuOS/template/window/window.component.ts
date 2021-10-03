import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() Component: any;
  constructor() {}

  ngOnInit(): void {}

  get AppComponent(): any {
    return this.Component;
  }
}
