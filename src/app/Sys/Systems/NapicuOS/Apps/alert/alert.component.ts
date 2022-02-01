import {Component, Inject, OnInit} from '@angular/core';
import {windowInjectMetadata} from "../../interface/Window/windowInject";
import {systemAlertTypeEnumMetadata} from "../../interface/Alert/alert";
import {directories} from "../../../../../interface/Directorie";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {


  constructor(@Inject('windowDataInjector') protected value: windowInjectMetadata) {
  }

  ngOnInit(): void {

  }

  get GetAlertIcon(): systemAlertTypeEnumMetadata | undefined {
    return this.value.alertType;
  }


}
