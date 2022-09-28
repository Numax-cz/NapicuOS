import {Component, OnInit} from '@angular/core';
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {NapicuOS} from "../../../system.napicuos";
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuDate} from "napicuformatter";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends WelcomeComponentClass<null> implements OnInit {

  ngOnInit(): void {
  }

  override checkSubmit(): boolean {
    return true;
  }

  override submit(): void | null {
  }

  get GetNextButtonText(): string{
    return NapicuOS.get_language_words().other.next;
  }

  get GetBackButtonText(): string{
    return NapicuOS.get_language_words().other.back;
  }

  get GetMainTitle(): string {
    return NapicuOS.get_language_words().other.welcome_main_title;
  }

  get GetDescTitle(): string {
    return NapicuOS.get_language_words().other.welcome_desc_text;
  }

  get GetAngularText(): string {
    return NapicuOS.get_language_words().other.built_on_angular;
  }

  get GetGithubIcon(): string {
    return SYSTEM_IMAGES.github
  }

  get GetAngularIcon(): string {
    return SYSTEM_IMAGES.angular
  }

  get GetYear(): string{
    return new NapicuDate().getCurrentYear().toString();
  }

  get GetOSVersion(): string {
    return NapicuOS.get_system_information_os_version();
  }
}
