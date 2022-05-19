import {Component, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../config/System";
import {fileConfigDisplayedMetadata, filesAndDirsViewMetadata} from "../../interface/Apps/FileManager";
import {GET_SYSTEM_FOLDERS_FILE} from "../../config/Apps/fileManager";
import {NapicuOS} from "../../system.napicuos";
import {ReplaceSystemVariables} from "../../scripts/ReplaceVariables";
import {SystemFile} from "../../SystemComponents/File";
import {ReturnGetDirByPathMetadata} from "../../interface/GetDirByPath";
import {SystemStateMetadata} from "../../interface/System";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  private declare foldersView: fileConfigDisplayedMetadata[];
  private declare drivesView: fileConfigDisplayedMetadata[];
  public declare topTxtView: { file: string, edit: string, view: string, go: string };
  private startDirectory: string = "/home/%USER/"
  public displayedFiles: filesAndDirsViewMetadata[] = [];

  public backHistoryPaths: string[] = [];
  public nextHistoryPaths: string[] = [];

  public canClickNext: boolean = false;
  public canClickBack: boolean = false;

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
    this.updateViewFilesAndDirs();
  }

  public checkPathCorrection(path: string): boolean {

    return true;
  }


  get GetFilesInDirectory(): filesAndDirsViewMetadata[] { //TODO

    let i = NapicuOS.get_dir_by_path(ReplaceSystemVariables(this.startDirectory));
    let out: filesAndDirsViewMetadata[] = [];

    if (i.data?.dir) Object.keys(i.data.dir).map((dirName: string) => {
      out.push({
        name: dirName,
        icon: SYSTEM_IMAGES.BlueFolder,
        isDir: true,
      })
    });
    if (i.data?.files) i.data.files.map((fileName: SystemFile) => {
      out.push({
        name: fileName.fileName,
        icon: fileName.iconPath,
        isDir: false
      })
    });
    return out;
  }

  public onClickDirAndFileView(i: filesAndDirsViewMetadata): void {
    if (i.isDir) {
      this.enterDir(i.name);
    }
  }

  public enterDir(dirName: string): void {
    this.backHistoryPaths.push(this.startDirectory);
    this.startDirectory = ReplaceSystemVariables(this.startDirectory + dirName + "/");
    this.updateViewFilesAndDirs();
  }

  public setDir(dirName: string): void {
    this.backHistoryPaths.push(this.startDirectory);
    this.startDirectory = ReplaceSystemVariables(dirName);
    this.updateViewFilesAndDirs();
  }

  public enterFile(fileName: string): void {
    //TODO
  }

  public clickFile(): void {

  }

  public clickEdit(): void {

  }

  public clickView(): void {

  }

  public clickGo(): void {

  }

  public clickSideFile(file: fileConfigDisplayedMetadata): void {
    this.setDir(file.directory);
  }

  public clickBack(): void {
    this.nextHistoryPaths.push(this.startDirectory);
    this.startDirectory = this.backHistoryPaths[this.backHistoryPaths.length - 1];
    this.backHistoryPaths.shift();
    this.updateViewFilesAndDirs();
  }

  public clickNext(): void {
    this.backHistoryPaths.push(this.startDirectory);
    this.startDirectory = this.nextHistoryPaths[this.nextHistoryPaths.length - 1];
    this.nextHistoryPaths.shift();
    this.updateViewFilesAndDirs();
  }

  public clickHome(): void {
    this.setDir("%USERDIR");
    this.clearNextHistoryPaths();
  }


  public onEnter(event: Event): void {
    let i: HTMLElement = event.target as HTMLElement;
    let input = i.innerText;
    if (!input.endsWith("/")) input += "/";

    let pathData: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(input);
    if (pathData.state === SystemStateMetadata.PathExist) this.setDir(input);
    event.preventDefault();
  }

  public clearBackHistoryPaths(): void {
    this.backHistoryPaths = [];
  }

  public clearNextHistoryPaths(): void {
    this.nextHistoryPaths = [];
  }

  public updateViewFilesAndDirs(): void {
    this.displayedFiles = this.GetFilesInDirectory;
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
