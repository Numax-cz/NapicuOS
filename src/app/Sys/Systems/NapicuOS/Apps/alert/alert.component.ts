import {Component, Inject, Input, OnInit} from '@angular/core';
import {systemAlertTypeEnumMetadata} from "../../interface/Alert/alert";
import {directories} from "../../../../../interface/Directorie";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() public declare input: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.input)
  }


}
