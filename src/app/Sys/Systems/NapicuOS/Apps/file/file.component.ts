import {Component, OnInit} from '@angular/core';
import {SYSTEM_DEFAULT_HOME_FOLDERS} from "../../config/System";
import {fileConfigDisplayedMetadata, fileConfigMetadata} from "../../interface/Apps/FileManager";
import {GET_SYSTEM_APPS_FILE_MANAGER_DISPLAYED_FILES} from "../../config/Apps/fileManager";
import {NapicuOS} from "../../system.napicuos";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  private foldersView: fileConfigDisplayedMetadata[] = GET_SYSTEM_APPS_FILE_MANAGER_DISPLAYED_FILES()
  public declare topTxtView: { file: string, edit: string, view: string, go: string };

  constructor() {
  }

  ngOnInit(): void {
    this.topTxtView = {
      file: NapicuOS.get_language_words().Apps.FileManager.file,
      edit: NapicuOS.get_language_words().Apps.FileManager.edit,
      view: NapicuOS.get_language_words().Apps.FileManager.view,
      go: NapicuOS.get_language_words().Apps.FileManager.go
    }
  }

  get GetHomeFolders(): fileConfigDisplayedMetadata[] {
    return this.foldersView
  }

  public clickFile(): void {

  }

  public clickEdit(): void {

  }

  public clickView(): void {

  }

  public clickGo(): void {

  }
}
