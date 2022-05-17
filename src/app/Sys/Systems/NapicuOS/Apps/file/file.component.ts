import {Component, OnInit} from '@angular/core';
import {SYSTEM_DEFAULT_HOME_FOLDERS, SYSTEM_IMAGES} from "../../config/System";
import {fileConfigDisplayedMetadata, fileConfigMetadata} from "../../interface/Apps/FileManager";
import {GET_SYSTEM_FOLDERS_FILE} from "../../config/Apps/fileManager";
import {NapicuOS} from "../../system.napicuos";
import {ReplaceSystemVariables} from "../../scripts/ReplaceVariables";
import {SystemFile} from "../../SystemComponents/File";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  private declare foldersView: fileConfigDisplayedMetadata[];
  private declare drivesView: fileConfigDisplayedMetadata[];
  public declare topTxtView: { file: string, edit: string, view: string, go: string };
  private startDirectory: string = "/home/%USER"

  constructor() {
  }

  ngOnInit(): void {
    this.topTxtView = {
      file: NapicuOS.get_language_words().Apps.FileManager.file,
      edit: NapicuOS.get_language_words().Apps.FileManager.edit,
      view: NapicuOS.get_language_words().Apps.FileManager.view,
      go: NapicuOS.get_language_words().Apps.FileManager.go
    }
    this.foldersView = GET_SYSTEM_FOLDERS_FILE();

    this.drivesView = NapicuOS.get_drives_name().map((driveName: string) => {
      return {
        name: driveName,
        directory: "/", //TODO MOUNT TO DRIVE
        icon: SYSTEM_IMAGES.Drive
      }
    });
  }

  public checkPathCorrection(path: string): boolean {

    return true;
  }

  public clickFile(): void {

  }

  public clickEdit(): void {

  }

  public clickView(): void {

  }

  public clickGo(): void {

  }

  public clickNext(): void {

  }

  public clickBack(): void {

  }

  public clickHome(): void {

  }

  public onEnter(event: Event): void {


    event.preventDefault();
  }


  get GetFilesInDirectory(): { name: string, icon: string }[] { //TODO
    let i = NapicuOS.get_dir_by_path(ReplaceSystemVariables(this.startDirectory));
    let out: { name: string, icon: string }[] = [];

    if (i.data?.dir) Object.keys(i.data.dir).map((dirName: string) => {
      out.push({
        name: dirName,
        icon: SYSTEM_IMAGES.BlueFolder
      })
    });
    if (i.data?.files) i.data.files.map((fileName: SystemFile) => {
      out.push({
        name: fileName.fileName,
        icon: fileName.iconPath
      })
    });


    return out;

  }

  get GetFoldersView(): fileConfigDisplayedMetadata[] {
    return this.foldersView;
  }

  get GetDrivesView(): fileConfigDisplayedMetadata[] {
    return this.drivesView;
  }

  get GetBackImage(): string {
    return SYSTEM_IMAGES.ArrowLeft;
  }

  get GetNextImage(): string {
    return SYSTEM_IMAGES.ArrowRight;
  }

  get GetHomeImage(): string {
    return SYSTEM_IMAGES.Home;
  }

  get GetFileIcon(): string {
    return SYSTEM_IMAGES.BlueFolder;
  }

  get GetDirectoryPath(): string {
    return ReplaceSystemVariables(this.startDirectory);
  }

}
