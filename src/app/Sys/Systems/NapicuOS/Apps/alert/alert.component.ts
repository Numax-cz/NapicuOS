import {Component, Inject, OnInit} from '@angular/core';
import {systemAlertTypeEnumMetadata} from "../../interface/Alert/alert";
import {directories} from "../../../../../interface/Directorie";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }


}
