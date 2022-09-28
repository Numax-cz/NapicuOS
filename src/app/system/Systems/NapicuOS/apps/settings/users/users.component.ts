import {Component, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuOS} from "../../../system.napicuos";
import {AppInputCheckFunctionReturn, AppMenuInputData} from "../../../interface/InputAlert";
import {SystemStateMetadata, SystemUserStateData} from "../../../interface/System";
import {User} from "../../../SystemComponents/User";
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
  public usersList: User[] = [];
  public declare selectedUser: number;

  constructor() { }

  ngOnInit(): void {
    this.updateUsersList();
    this.selectedUser = this.GetActiveUserIndex;
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
        buttonType: NapicuOS.get_button_type_verify_cancel(),
        inputType: "password"
      },
      submitFunction: this.submitVerifyRootUser,
      rejectFunction: this.closeInputMenu,
      checkFunction: this.checkVerifyRootUser,
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

  protected submitVerifyRootUser = (value: string): AppInputCheckFunctionReturn => {
    let i = NapicuOS.verify_root_password(value);
    if(!i) return {submit: false, message: NapicuOS.get_language_words().other.pass_error};
    this.closeInputMenu();
    this.verifyRoot = true;
    return {submit: true}
  }

  protected updateUsersList(): void {
    this.usersList = NapicuOS.get_users();
  }

  // public newNameSubmit(value: string): void {
  //
  // }

  public openAddUserMenu = (): void => {
    NapicuOS.open_app(SystemAppsProcessName.userManager);
    // this.addUserMenuDisplayed = true;
    // SettingsComponent.disableEvent();
  }

  public onSetPermission = (value: number): void => {
    NapicuOS.set_active_user_permission(value);
  }

  // public closeAddUserMenu = (): void => {
  //   this.addUserMenuDisplayed = false;
  //   SettingsComponent.allowEvent();
  // }

  get GetIsActiveUserRoot(): boolean {
    return NapicuOS.get_active_user_is_root();
  }

  get GetUserIcon(): string {
    return SYSTEM_IMAGES.user;
  }

  get GetActiveUser(): User | undefined{
    return this.usersList[this.selectedUser];
  }

  get GetActiveUserPerms(): number{
    return Object.values(SystemUserPermissionsEnumMetadata).indexOf(<SystemUserPermissionsEnumMetadata>this.usersList[this.selectedUser].permissions);
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

  get GetTypeUser(): string[]{
    return Object.values(SystemUserPermissionsEnumMetadata)
  }

  get GetVerify1Text(): string{
    return NapicuOS.get_language_words().other.settings_verify_1;
  }

  get GetVerify2Text(): string{
    return NapicuOS.get_language_words().other.settings_verify_2;
  }

  get GetUsersText(): string{
    return NapicuOS.get_language_words().other.users;
  }

  get GetActiveUserIndex(): number{
    return NapicuOS.get_active_user_index();
  }

  get GetVerifyText(): string {
    return NapicuOS.get_language_words().other.verify;
  }
}
