import { Component, Input, OnInit } from '@angular/core';
import { SystemBoot } from '../../../GET';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
})
export class WindowComponent implements OnInit {
  @Input() Component: any;
  constructor() {}

  ngOnInit(): void {}

  public close(): void {}
  public full(): void {}
  public minimized(): void {}

  get AppComponent(): any {
    return this.Component;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
