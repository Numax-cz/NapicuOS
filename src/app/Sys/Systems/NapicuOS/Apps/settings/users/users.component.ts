import {Component, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuOS} from "../../../system.napicuos";
import {AppInputCheckFunctionReturn, AppMenuInputData} from "../../../interface/InputAlert";
import {SystemStateMetadata, SystemUserStateData} from "../../../interface/System";
import {User} from "../../../SystemComponents/User";
import {SettingsComponent} from "../settings.component";
import {SystemAppsProcessName} from "../../../config/Apps/AppsNames";
import {SystemUserPermissionsEnumMetadata} from "../../../config/UserPerms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public showInputMenu: boolean = false;
  public declare inputMenuData: AppMenuInputData;
  public addUserMenuDisplayed: boolean = false;
  public verifyRoot: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.verifyRoot = (NapicuOS.get_active_user_permission() == SystemUserPermissionsEnumMetadata.SuperUser);
  }



  public openSetUserNameMenu(): void {
    if(this.showInputMenu) return;
    this.inputMenuData = {
      inputData: {
        value: NapicuOS.get_language_words().other.change_username,
        buttonType: NapicuOS.get_button_type_rename_cancel()
      },
      submitFunction: this.submitNewUserName,
      rejectFunction: this.closeInputMenu,
      checkFunction: this.checkNewUserName
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
      rejectFunction: this.closeInputMenu,
      checkFunction: this.checkNewUserPassowrd
    }
    this.openInputMenu();
  }

  public openVerifyUser(): void {
    if(this.showInputMenu) return;
    this.inputMenuData = {
      inputData: {
        value: NapicuOS.get_language_words().other.enter_root_pass,
        buttonType: NapicuOS.get_button_type_verify_cancel()
      },
      submitFunction: this.submitVerifyRootUser,
      rejectFunction: this.closeInputMenu,
      checkFunction: this.checkVerifyRootUser
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

  protected checkNewUserName = (value: string): AppInputCheckFunctionReturn => {
    return {submit: (NapicuOS.check_username(value) === SystemStateMetadata.UserNotExists)};
  }

  protected submitNewUserPassword = (value: string): void => {
    this.closeInputMenu();
  }

  protected checkNewUserPassowrd = (value: string): AppInputCheckFunctionReturn => {
    return {submit: (NapicuOS.check_password(value) === SystemStateMetadata.StringCorrect)};
  }

  protected openInputMenu(): void {
    this.showInputMenu = true;
  }

  protected closeInputMenu = (): void  => {
    this.showInputMenu = false;
  }

  protected checkVerifyRootUser = (): AppInputCheckFunctionReturn => {



    return {submit: true};
  }

  protected submitVerifyRootUser = (): AppInputCheckFunctionReturn => {

    return {submit: false, message: "ERROR"};

  }

  // public newNameSubmit(value: string): void {
  //
  // }

  public openAddUserMenu = (): void => {
    NapicuOS.open_app(SystemAppsProcessName.userManager);
    // this.addUserMenuDisplayed = true;
    // SettingsComponent.disableEvent();
  }

  public onSetPermission = (): void => {

  }

  // public closeAddUserMenu = (): void => {
  //   this.addUserMenuDisplayed = false;
  //   SettingsComponent.allowEvent();
  // }


  get GetUserIcon(): string {
    return SYSTEM_IMAGES.user;
  }

  get GetActiveUser(): User | undefined{
    return NapicuOS.get_active_user();
  }

  get GetActiveUserPerms(): number{
    return NapicuOS.get_active_user_permission_index();
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

  get GetPassTxt(): string {
    let lng = NapicuOS.get_language_words();
    return NapicuOS.get_active_user()?.password.length ? lng.other.yes : lng.other.none;
  }

  get GetPasswordText(): string{
    return NapicuOS.get_language_words().other.password;
  }

  get GetAutoAuthText(): string{
    return NapicuOS.get_language_words().other.auto_auth;
  }

  get GetAuthAndLoginText(): string{
    return NapicuOS.get_language_words().other.auth_and_login;
  }

  get GetAddUserText(): string{
    return NapicuOS.get_language_words().other.add_user;
  }

  get GetUsers(): User[] {
    return NapicuOS.get_users();
  }

  get GetTypeUser(): string[]{
    return Object.values(SystemUserPermissionsEnumMetadata)
  }

  get GetVerify1Text(): string{
    return NapicuOS.get_language_words().other.settings_verify_1;
  }

  get GetVerify2Text(): string{
    return NapicuOS.get_language_words().other.settings_verify_2;
  }
}
