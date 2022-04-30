import {Component, OnInit} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


  get GetUsersPermission() {
    return Object.keys(SystemUserPermissionsEnumMetadata);
  }
}
