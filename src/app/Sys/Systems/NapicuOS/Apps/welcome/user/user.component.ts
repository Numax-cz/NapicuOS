import {Component, OnInit} from '@angular/core';
import {SystemInstallationOptionsMetadata} from "../../../interface/Apps/welcome";
import {WelcomeComponent} from "../welcome.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

  public GetConfig(): SystemInstallationOptionsMetadata {
    return WelcomeComponent.systemInstallationOptions;
  }

}
