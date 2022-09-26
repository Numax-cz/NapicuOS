import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AppInputCheckFunctionReturn, AppMenuInputData} from "../../interface/InputAlert";


@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent implements OnInit, AfterViewInit {
  public declare inputValue: string;
  public allowSubmit: boolean = false;
  public declare errorMessage: string | undefined;
  @Input() public declare data: AppMenuInputData;
  @ViewChild('Input') declare usernameElement: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.usernameElement.nativeElement.focus();

  }

  public onReject(): void {
    this.data.rejectFunction?.();
  }

  public onSubmit(): void {
     let i: AppInputCheckFunctionReturn | void =  this.data.submitFunction(this.inputValue);
     if(i){
       this.allowSubmit = !!i?.submit;
       this.errorMessage = i?.message;
     }
  }

  public onChangeInput(): void {
    let i = this.data.checkFunction?.(this.inputValue);
    this.allowSubmit = !!i?.submit;
    this.errorMessage = i?.message;
  }
}
