import {Component, Input, OnInit} from '@angular/core';
import {SystemWindowAppInjectData} from "../../interface/Window/Window";
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";

@Component({
  selector: 'app-wordpad',
  templateUrl: './wordpad.component.html',
  styleUrls: ['./wordpad.component.scss']
})
export class WordpadComponent implements OnInit, SystemWindowAppInjectData {
  @Input() public declare data: InputAlertData;
  @Input() public declare windowValue: ProcessWindowValueMetadata;
  @Input() public declare process: Process;
  @Input() public declare arguments: any;
  constructor() { }

  ngOnInit(): void {
  }

  public openFile(): void {

  }

  public saveFile(): void {

  }





}
