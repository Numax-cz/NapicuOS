import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'in-app-window',
  templateUrl: './app-window.component.html',
  styleUrls: ['./app-window.component.scss']
})
export class AppWindowComponent implements OnInit {
  @Input() public title: string = "";
  @Input() public declare onClose: () => void;

  constructor() { }

  ngOnInit(): void {

  }


  public close(): void {
    this.onClose?.();
  }


}
