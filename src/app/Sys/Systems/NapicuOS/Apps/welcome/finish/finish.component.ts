import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";

@Component({
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get GetInstallationDoneText(): string {
    return NapicuOS.get_language_words().other.welcome_installation_is_done;
  }

}
