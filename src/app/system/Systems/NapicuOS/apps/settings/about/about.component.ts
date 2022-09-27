import {Component, OnInit} from '@angular/core';
import {NapicuBios} from "../../../SystemComponents/Bios";
import {NapicuOS} from "../../../system.napicuos";
import {AppInputCheckFunctionReturn, AppMenuInputData} from "../../../interface/InputAlert";
import {SystemStateMetadata, SystemStringStateCorrection} from "../../../interface/System";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public showInputMenu: boolean = false;
  public declare inputMenuData: AppMenuInputData;

  constructor() { }

  ngOnInit(): void {
  }

  public openSetHost(): void {
    if(this.showInputMenu) return;
    this.inputMenuData = {
      inputData: {
        value: NapicuOS.get_language_words().other.change_host_name,
        buttonType: NapicuOS.get_button_type_change_cancel(),
        inputType: "text"
      },
      submitFunction: this.submitNewHost,
      rejectFunction: this.closeInputMenu,
      checkFunction: this.checkNewHostValid
    }
    this.openInputMenu();
  }

  protected submitNewHost = (value: string): void => {
    let i: SystemStringStateCorrection = NapicuOS.set_hostname(value);
    this.closeInputMenu();
  }

  protected checkNewHostValid = (value: string): AppInputCheckFunctionReturn => {
    let lng: SystemStringStateCorrection = NapicuOS.check_hostname(value);
    return {submit: (lng === SystemStateMetadata.StringCorrect)};
  }

  protected closeInputMenu = (): void  => {
    this.showInputMenu = false;
  }

  protected openInputMenu(): void {
    this.showInputMenu = true;
  }

  get GetCpuModel(): string {
    return NapicuBios.get_cpu_name();
  }

  get GetGpuModel(): string {
    return NapicuBios.get_gpu_name();
  }

  get GetDiskCapacity(): string {
    return NapicuBios.get_selected_drive().capacity;
  }

  get GetMemSize(): string {
    return NapicuBios.get_mem_size();
  }

  get GetDeviceName(): string {
    return NapicuOS.get_hostname();
  }

  get GetOSName(): string {
    return NapicuOS.get_system_information_os_name();
  }

  get GetOSVersion(): string {
    return NapicuOS.get_system_information_os_version();
  }

  get GetOSType(): string {
    return NapicuOS.get_system_information_os_type();
  }

  get GetAboutLangTexts(){
    return NapicuOS.get_language_words().Apps.SettingsAbout;
  }
}
