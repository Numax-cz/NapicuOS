import {Component, Host, HostBinding, HostDecorator, HostListener, Input, OnInit} from '@angular/core';
import {SystemWindowAppInjectData} from "../../interface/Window/Window";
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {SystemFile} from "../../SystemComponents/File";
import {NapicuOS} from "../../system.napicuos";
import {SystemStateMetadata} from "../../interface/System";
import {fromEvent} from "rxjs";
import {setTimeInterval} from "../../../../../Bios/Scripts/TimeController";

@Component({
  selector: 'app-wordpad',
  templateUrl: './wordpad.component.html',
  styleUrls: ['./wordpad.component.scss']
})
export class WordpadComponent implements OnInit, SystemWindowAppInjectData {
  @Input() public declare data: InputAlertData;
  @Input() public declare windowValue: ProcessWindowValueMetadata;
  @Input() public declare process: Process;
  @Input() public declare args: string[];

  public declare file: SystemFile | null;

  public contentView: string = "";

  protected isCtrl: boolean = false;


  constructor() {
  }

  ngOnInit(): void {
    if(this.args.length){
      this.loadFile();
    }
  }
  public loadFile(): void {
    let i: SystemStateMetadata | SystemFile = NapicuOS.get_file_by_path(this.args[0]);
    if(i instanceof SystemFile) this.file = i;
    if(this.file) {
      this.contentView = this.file.value;
      this.windowValue.windowTitle = this.file.fileName;
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  ngOnDestroy(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public openFile(): void {

  }

  public saveFile(): void {

  }

  public onKeyDown = (event: KeyboardEvent): void =>  {
    if(!this.windowValue.activated) return;
    if(event.keyCode == 17) this.isCtrl=true;
    if(event.keyCode == 83 && this.isCtrl == true) {
      this.saveFile();
      event.preventDefault();
    }

  }






}
