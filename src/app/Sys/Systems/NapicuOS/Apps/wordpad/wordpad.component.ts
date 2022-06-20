import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SystemWindowAppInjectData} from "../../interface/Window/Window";
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {SystemFile} from "../../SystemComponents/File";
import {NapicuOS} from "../../system.napicuos";
import {SystemStateMetadata} from "../../interface/System";
import {ReplaceSystemVariables} from "../../scripts/ReplaceVariables";
import {NapicuApps} from "../../systemApps.napicuos";
import {FileManagerResponse} from "../../interface/Apps/Response/FileManagerRes";

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
  @ViewChild('InputValue') public declare inputValue: ElementRef<HTMLElement>;

  public declare file: SystemFile | null;


  constructor() {
  }

  ngOnInit(): void {
  }


  public loadFile(): void {
    let i: SystemFile | null = this.getFile();
    if(i) {
      this.file = i
      this.setNotepadContent(this.file.value)
      //this.windowValue.windowTitle = this.file.fileName; //TODO ERROR IN CONSOLE
    }
  }

  ngAfterViewInit(): void {
    if(this.args.length){
      this.loadFile();
    }
    window.addEventListener("keydown", this.onKeyDown);
  }

  ngOnDestroy(): void {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  public openFile(): void {

  }

  public async onSaveFile(): Promise<void> {
    if(this.args[0]){
      let file: SystemStateMetadata | SystemFile = NapicuOS.get_file_by_path(this.args[0]);
      if(file instanceof SystemFile) {
        NapicuOS.rewrite_dynamic_file(ReplaceSystemVariables(this.args[0]), this.getNotepadContent());
      }
    }else {
      let get_dir: FileManagerResponse = await NapicuApps.SystemAppFileManager();
      if(get_dir?.filePath && get_dir?.fileName){
        NapicuOS.creat_dynamic_document(get_dir.filePath, get_dir.filePath, this.inputValue.nativeElement.innerHTML || '')
      }
    }
  }

  public onKeyDown = (event: KeyboardEvent): void =>  {
    if(!this.windowValue.activated) return;
    if (event.keyCode == 83 && (event.ctrlKey || event.metaKey)){
      this.onSaveFile();
      event.preventDefault();
    }
  }

  protected getFile(): SystemFile | null{
    let i: SystemStateMetadata | SystemFile = NapicuOS.get_file_by_path(this.args[0]);
    if(i instanceof SystemFile) return i;
    return null;
  }

  public setNotepadContent(value: string): void {
    this.inputValue.nativeElement.innerHTML = value;
  }

  public getNotepadContent(): string {
    return this.inputValue.nativeElement.innerHTML;
  }
}



