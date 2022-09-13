import {Component, OnInit} from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";

@Component({
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  public static restartTime: number = 5000;

  constructor() { }

  ngOnInit(): void {
    //setTimeout(() => {WelcomeComponent.restartDevice()}, FinishComponent.restartTime);
  }

  get GetInstallationDoneText(): string {
    return NapicuOS.get_language_words().other.welcome_installation_is_done;
  }

}
