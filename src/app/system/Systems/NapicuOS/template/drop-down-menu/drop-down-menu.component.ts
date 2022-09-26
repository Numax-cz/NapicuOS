import {Component, EventEmitter, Host, Input, OnInit, Optional, Output, SkipSelf} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

interface DropDownMenuData {
  name: string,
  id?: number
}

@Component({
  selector: 'napicu-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropDownMenuComponent,
    multi: true
  }]
})
export class DropDownMenuComponent implements ControlValueAccessor, OnInit {
  @Input() options: string[] = []
  @Input() selectedOption: number = 0;
  @Input() arrow: boolean = true;
  @Input() declare onSet: (value: number) => void;
  @Output() napicuDropDownMenuClick = new EventEmitter<string>();
  @Input() declare formControlName: string;
  private declare control: AbstractControl;
  public isDropDownOpen = false;

  constructor(@Optional() @Host() @SkipSelf()
              private controlContainer: ControlContainer) {
  }

  public selectItem(index: number): void {
    this.selectedOption = index;
    this.isDropDownOpen = false;
    if (this.control) this.control.setValue(this.options[index]);
    this.onSet?.(index);
  }

  ngOnInit(): void {
    if (this.controlContainer) {
      if (this.formControlName) {
        let i = this.controlContainer.control?.get(this.formControlName);
        if (i) this.control = i;
        this.control.setValue(this.options[this.selectedOption]);
      } else {
        console.warn('FormControlName error');
      }
    }
    // else {
    //   console.warn('Can\'t find parent FormGroup directive');
    // }
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
