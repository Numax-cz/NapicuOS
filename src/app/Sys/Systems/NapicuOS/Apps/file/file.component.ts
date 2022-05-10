import {Component, OnInit} from '@angular/core';
import {SYSTEM_DEFAULT_HOME_FOLDERS} from "../../config/System";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  private foldersView: string[] = SYSTEM_DEFAULT_HOME_FOLDERS; //TODO ICON AND NAME


  constructor() {
  }

  ngOnInit(): void {
  }

  get GetHomeFolders(): string[] {
    return SYSTEM_DEFAULT_HOME_FOLDERS
  }

}
