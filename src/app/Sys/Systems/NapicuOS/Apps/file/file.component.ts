import {Component, Input, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../config/System";
import {
  fileConfigDisplayedMetadata,
  filesAndDirSelectMetadata,
  filesAndDirsViewMetadata
} from "../../interface/Apps/FileManager";
import {GET_SYSTEM_FOLDERS_FILE} from "../../config/Apps/fileManager";
import {NapicuOS} from "../../system.napicuos";
import {ReplaceSystemVariables} from "../../scripts/ReplaceVariables";
import {SystemFile} from "../../SystemComponents/File";
import {ReturnGetDirByPathMetadata} from "../../interface/GetDirByPath";
import {SystemStateMetadata} from "../../interface/System";
import {ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {SystemFileTypeEnumMetadata} from "../../interface/FilesDirs/File";

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

  public boxMenuPosition: { x: number, y: number } | null = null;

  public showFileManagerContextMenu: boolean = false;
  public showFilePropertyContextMenu: boolean = false;
  public showDirPropertyContextMenu: boolean = false;

  public selectedFileDir: filesAndDirSelectMetadata | null = null;

  public freezeContent: boolean = false;

  @Input() public declare windowValue: ProcessWindowValueMetadata;

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


    window.addEventListener('mousedown', (event) => {
      var p = event.target as HTMLElement;
      if (!p.getAttribute('clickable') &&
        !p.offsetParent?.getAttribute('clickable')) {
        this.showDirPropertyContextMenu = false;
        this.showFilePropertyContextMenu = false;
        this.showFileManagerContextMenu = false;

        if(!this.freezeContent) this.selectedFileDir = null;
      }

    });

  }

  public updateMousePosition(event: MouseEvent) {
    this.boxMenuPosition = {
      x: (event.clientX - this.windowValue.getLeft()),
      y: (event.clientY - this.windowValue.getTop())
    }
    event.preventDefault();
  }

  public clickShowFileManagerContextMenu(event: MouseEvent) {
    this.showFileManagerContextMenu = !this.showFileManagerContextMenu;
    this.showDirPropertyContextMenu = false;
    this.showFilePropertyContextMenu = false;
    this.updateMousePosition(event);
  }

  public clickFileAndDirProperty(event: MouseEvent, i: filesAndDirsViewMetadata): void {
    if(this.freezeContent) return;
    if (!i.fileType) {
      this.showDirPropertyContextMenu = !this.showDirPropertyContextMenu;
    } else this.showFilePropertyContextMenu = !this.showFilePropertyContextMenu
    if(this.showDirPropertyContextMenu ||this.showFilePropertyContextMenu) {
      this.selectedFileDir = {name: i.name, isDir: i.fileType == null};
    } else this.selectedFileDir = null;
    this.showFileManagerContextMenu = false;
    this.updateMousePosition(event);
    event.stopPropagation();
  }


  get GetFilesInDirectory(): filesAndDirsViewMetadata[] { //TODO

    let i = NapicuOS.get_dir_by_path(ReplaceSystemVariables(this.startDirectory));
    let out: filesAndDirsViewMetadata[] = [];

    if (i.data?.dir) Object.keys(i.data.dir).map((dirName: string) => {
      out.push({
        name: dirName,
        icon: SYSTEM_IMAGES.BlueFolder,
        fileType: null,
      })
    });
    if (i.data?.files) i.data.files.map((file: SystemFile) => {
      out.push({
        name: file.fileName,
        icon: file.iconPath,
        fileType: file.fileType,
      })
    });
    return out;
  }

  public onClickDirAndFileView(i: filesAndDirsViewMetadata): void {
    if(this.freezeContent) return;
    if (!this.selectedFileDir || this.selectedFileDir.name != i.name) {
      this.selectedFileDir = {name: i.name, isDir: i.fileType == null};
      this.updateViewFilesAndDirs();
      return;
    }
    if (!i.fileType) {
      this.enterDir(i.name);
    } else {
      this.openFile(i.name, i.fileType);
    }


    this.selectedFileDir = null;
  }

  public openFile(name: string, fileType: SystemFileTypeEnumMetadata): void {
    let i:  SystemStateMetadata | SystemFile = NapicuOS.get_file_by_path(`${this.startDirectory}${name}`);
    if (i instanceof SystemFile) {
        i.open({params: [`${this.startDirectory}${name}`]});
    console.log(i);

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

  public clickRight(): void {

  }

  public clickCreatDirectory(): void {
    this.closeAllContextMenu();
    this.creatDirectory();
  }

  public clickCreatFile(): void {
    this.closeAllContextMenu();
    this.creatDocument();
  }

  public clickRenameItem(): void {
    //TODO check file or dir
    this.renameDirectory(); //TODO RENAME Directory and File
  }

  public clickDeleteItem(): void {
    if(this.selectedFileDir?.isDir){
      this.deleteDirectory()
    } this.deleteFile();
  }

  protected renameDirectory = async (): Promise<void> => {
    this.enableFreezeContent();
    let new_dir_name: string | null = await NapicuOS.input_alert(NapicuOS.get_language_words().other.rename, NapicuOS.get_language_words().other.enter_new_name, SYSTEM_IMAGES.BlueFolder);
    if(new_dir_name){
      if(NapicuOS.check_file_name(new_dir_name)){
         NapicuOS.rename_dir(ReplaceSystemVariables(`${this.startDirectory}${this.selectedFileDir}`), new_dir_name);
        this.updateViewFilesAndDirs();
      }
      //TODO ERROR => bad name
    }
    this.disableFreezeContent();
  }

  protected deleteFile(): void {
    let file_name: string | undefined = this.selectedFileDir?.name;
    if(file_name){
   
    }
  }


  protected deleteDirectory(): void {
    let dir_name: string | undefined = this.selectedFileDir?.name;
    if(dir_name){
    }
  }


  public creatDirectory = async (): Promise<void> => {
    this.enableFreezeContent();
    let dir_name: string | null = await NapicuOS.input_alert(NapicuOS.get_language_words().other.creat.creat_dir, `${NapicuOS.get_language_words().other.enter_name}:`, SYSTEM_IMAGES.BlueFolder);
    if (dir_name) {
      NapicuOS.creat_dynamic_path_config(ReplaceSystemVariables(this.startDirectory), dir_name);
      this.updateViewFilesAndDirs();
    }
    this.disableFreezeContent();
  }

  public creatDocument = async (): Promise<void> => {
    let doc_name: string | null = await NapicuOS.input_alert(NapicuOS.get_language_words().other.creat.creat_doc, `${NapicuOS.get_language_words().other.enter_name}:`, SYSTEM_IMAGES.AppDocText);
    if (doc_name) {
      let dir_pth: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(ReplaceSystemVariables(this.startDirectory));
      NapicuOS.creat_dynamic_blank_document(ReplaceSystemVariables(this.startDirectory), doc_name);
      this.updateViewFilesAndDirs();
    }
  }

  public clickSideFile(file: fileConfigDisplayedMetadata): void {
    if(this.freezeContent) return
    this.setDir(file.directory);
  }

  public clickBack(): void {
    if(!this.backHistoryPaths.length || this.freezeContent) return;
    this.nextHistoryPaths.push(this.startDirectory);
    this.startDirectory = this.backHistoryPaths[this.backHistoryPaths.length - 1];
    this.backHistoryPaths.shift();
    this.updateViewFilesAndDirs();
  }

  public clickNext(): void {
    if(!this.nextHistoryPaths.length || this.freezeContent) return;
    this.backHistoryPaths.push(this.startDirectory);
    this.startDirectory = this.nextHistoryPaths[this.nextHistoryPaths.length - 1];
    this.nextHistoryPaths.shift();
    this.updateViewFilesAndDirs();
  }

  public closeAllContextMenu(): void {
    this.showFileManagerContextMenu = false;
    this.showDirPropertyContextMenu = false;
    this.showFilePropertyContextMenu = false;
  }

  public clickHome(): void {
    if( this.freezeContent) return;
    this.setDir("%USERDIR");
    this.clearNextHistoryPaths();
  }

  protected enableFreezeContent(): void {
    this.freezeContent = true;
  }

  protected disableFreezeContent(): void {
    this.freezeContent = false;
  }


  public onEnter(event: Event): void {
    let i: HTMLElement = event.target as HTMLElement;
    let input = i.innerText;
    if (!input.endsWith("/")) input += "/";

    let pathData: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(input);
    if (pathData.state === SystemStateMetadata.PathExist) this.setDir(input);
    event.preventDefault();
  }

  //TODO kontrolovat jestli je to soubor / adresář

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

  get GetAddFileImage(): string {
    return SYSTEM_IMAGES.addFile;
  }

  get GetAddFolderImage(): string {
    return SYSTEM_IMAGES.addFolder;
  }

  get GetPlacesText(): string {
    return NapicuOS.get_language_words().other.places;
  }

  get GetDevicesText(): string {
    return NapicuOS.get_language_words().other.devices;
  }
}
