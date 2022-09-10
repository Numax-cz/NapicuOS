import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";

@Component({
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get GetNextButtonText(): string{
    return NapicuOS.get_language_words().other.next;
  }

  get GetBackButtonText(): string{
    return NapicuOS.get_language_words().other.back;
  }
}
