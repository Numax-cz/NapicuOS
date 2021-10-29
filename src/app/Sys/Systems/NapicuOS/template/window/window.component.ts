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
  log(e: any) {
    console.log(e.Window);
  }
  get AppComponent(): any {
    return this.Component;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
}
