import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-drop-down-input',
  templateUrl: './drop-down-input.component.html',
  styleUrls: ['./drop-down-input.component.scss']
})
export class DropDownInputComponent implements OnInit {
  @Input() arrow: boolean = true;
  @Input() placeholderValue: string = "";
  @Output() napicuDropDownMenuClick = new EventEmitter<string>();
  public isDropDownOpen = false;

  constructor() { }

  ngOnInit(): void {
  }



  public openInput(): void {

  }

  public onSubmit(): void {

  }
}
