import {Component, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuOS} from "../../../system.napicuos";
import {AppMenuInputData} from "../../../interface/InputAlert";
import {SystemStateMetadata, SystemUserStateData} from "../../../interface/System";
import {User} from "../../../SystemComponents/User";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public showInputMenu: boolean = false;
  public declare inputMenuData: AppMenuInputData;

  constructor() { }

  ngOnInit(): void {
  }

  get GetUserIcon(): string {
    return SYSTEM_IMAGES.user;
  }

  get GetActiveUserName(): string {
    return NapicuOS.get_active_user()?.username || 'NULL';
  }

  get GetActiveUserAuth(): string {
    let user = NapicuOS.get_active_user();
    if(user){
      return user.autoAuth ? NapicuOS.get_language_words().other.enabled : NapicuOS.get_language_words().other.disabled;
    }
    return 'NULL';
  }

  get GetPencilIcon(): string {
    return SYSTEM_IMAGES.pencil;
  }

  public openSetUserNameMenu(): void {
    if(this.showInputMenu) return;
    this.inputMenuData = {
      inputData: {
        value: 'Enter new username',
        buttonType: NapicuOS.get_button_type_rename_cancel()
      },
      submitFunction: this.submitNewUserName,
      rejectFunction: this.closeInputMenu
    }
    this.openInputMenu();
  }

  public openSetUserPass(): void {
    if(this.showInputMenu) return;
    this.inputMenuData = {
      inputData: {
        value: NapicuOS.get_language_words().other.change_password,
        buttonType: NapicuOS.get_button_type_change_cancel(),
        inputType: "password"
      },
      submitFunction: this.submitNewUserPassword,
      rejectFunction: this.closeInputMenu
    }
    this.openInputMenu();
  }

  public onChangeAutoLoginSwitch(): void {
    let ac_user: User | undefined = NapicuOS.get_active_user();
    if(!ac_user){
      console.error("[NAPICUOS] User error");
      return;
    }

    NapicuOS.set_user_auth(ac_user.username, !ac_user.autoAuth);
  }

  get GetAutoLoginSwitchA(): boolean{
    return NapicuOS.get_active_user_has_auto_login();
  }

  protected submitNewUserName = (value: string): void => {
    let ac_user = NapicuOS.get_active_user();
    if(ac_user){
      let usr_str: SystemUserStateData | SystemStateMetadata.Success = NapicuOS.set_user_name(ac_user.username, value);
      //TODO Error handling
      if(usr_str === SystemStateMetadata.Success) {
        NapicuOS.logout_user();
      }
    }
    this.closeInputMenu();
  }

  protected submitNewUserPassword = (value: string): void => {

    this.closeInputMenu();
  }

  protected openInputMenu(): void {
    this.showInputMenu = true;
  }

  protected closeInputMenu = (): void  => {
    this.showInputMenu = false;
  }


  public newNameSubmit(value: string): void {
    console.log("submit")
  }

  get GetPassTxt(): string {
    let lng = NapicuOS.get_language_words();
    return NapicuOS.get_active_user()?.password.length ? lng.other.yes : lng.other.none;
  }



}
