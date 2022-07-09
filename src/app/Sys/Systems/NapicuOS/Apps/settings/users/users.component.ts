import {Component, Input, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuOS} from "../../../system.napicuos";
import {AppMenuInputData, InputAlertData, InputAppAlertData} from "../../../interface/InputAlert";

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
        buttonType: NapicuOS.get_button_type_creat_cancel()
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
        value: 'Enter new password',
        buttonType: NapicuOS.get_button_type_creat_cancel(),
        inputType: "password"
      },
      submitFunction: this.submitNewUserPassword,
      rejectFunction: this.closeInputMenu
    }
    this.openInputMenu();
  }

  protected submitNewUserName = (value: string): void => {
    console.log(value);
    this.closeInputMenu();
  }

  protected submitNewUserPassword = (value: string): void => {
    console.log(value);
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



}
