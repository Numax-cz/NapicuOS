import {Component, OnInit} from '@angular/core';
import {SYSTEM_DEFAULT_HOME_FOLDERS} from "../../config/System";
import {fileConfigDisplayedMetadata, fileConfigMetadata} from "../../interface/Apps/FileManager";
import {GET_SYSTEM_APPS_FILE_MANAGER_DISPLAYED_FILES} from "../../config/Apps/fileManager";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  private foldersView: fileConfigDisplayedMetadata[] = GET_SYSTEM_APPS_FILE_MANAGER_DISPLAYED_FILES()

  // ICON AND NAME


  constructor() {
  }

  ngOnInit(): void {
  }

  get GetHomeFolders(): fileConfigDisplayedMetadata[] {
    return this.foldersView
  }

}
