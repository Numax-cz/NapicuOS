import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface DropDownMenuData {
  name: string,
  id?: number
}

@Component({
  selector: 'napicu-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent {
  @Input() options: string[] = []
  @Input() selectedOption: number = 0;
  @Output() napicuDropDownMenuClick = new EventEmitter<string>();
  public isDropDownOpen = false;

  constructor() {
  }


  public selectItem(index: number): void {
    this.selectedOption = index;
    this.isDropDownOpen = false;
  }
}
