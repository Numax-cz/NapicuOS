import { Component, OnInit } from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuOS} from "../../../system.napicuos";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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



}
