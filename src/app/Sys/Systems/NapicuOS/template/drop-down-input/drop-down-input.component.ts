import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-drop-down-input',
  templateUrl: './drop-down-input.component.html',
  styleUrls: ['./drop-down-input.component.scss']
})
export class DropDownInputComponent implements OnInit {
  @Input() arrow: boolean = true;
  @Input() placeholderValue: string = "";
  @Input() public declare onSubmit: (city: string) => Promise<string | null>;
  @Output() napicuDropDownMenuClick = new EventEmitter<string>();

  public isDropDownOpen = false;
  public errorMessage: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }



  public openInput(): void {
    this.isDropDownOpen = !this.isDropDownOpen;
    this.errorMessage = null;
  }

  public onSubmitInput(value: string): void {
    this.onSubmit?.(value).then((data) => this.errorMessage = data).finally(() => {
      if(!this.errorMessage) this.isDropDownOpen = false;
    });

  }
}
