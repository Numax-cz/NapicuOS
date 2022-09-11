import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";
import {Loader} from "../../../SystemComponents/Loader";
import {NapicuDate} from "napicuformatter";
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {welcomeUserInstallationDataMetadata} from "../../../interface/Apps/Welcome";

@Component({
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit, AfterViewInit {
  @ViewChild("Line") public declare loadElement: ElementRef<HTMLElement> ;
  public installationText: string = "";

  public done: boolean = false;

  protected declare loader: Loader;

  constructor() {
    super();
  }

  ngOnInit() {
    this.installationText = NapicuOS.get_language_words().other.welcome_installing_system
  }

  ngAfterViewInit() {
    this.installSystem();
  }

  public installSystem = (): void => {
    this.loader = new Loader(250, this.loadElement, this.loadUser);
    this.loader.start();
  }

  public loadUser = (): void => {
    this.installationText = NapicuOS.get_language_words().other.welcome_creating_users;
    this.loader = new Loader(50, this.loadElement, this.verifySystem);
    this.loader.start();
  }

  public verifySystem = (): void => {
    this.installationText = NapicuOS.get_language_words().other.welcome_verifying;
    this.loader = new Loader(10, this.loadElement, this.endInstallationSystem);
    this.loader.start();
  }

  public endInstallationSystem = (): void => {
    this.installationText = NapicuOS.get_language_words().other.welcome_verifying;
    this.loader = new Loader(2, this.loadElement, this.finishInstallation);
    this.loader.start();
  }

  public finishInstallation = (): void => {
    this.installationText = NapicuOS.get_language_words().other.welcome_done
    this.done = true;
  }

  get GetDoneInstallationDescText(): string {
    return NapicuOS.get_language_words().other.welcome_done_installation;
  }

  get GetNextButtonText(): string{
    return NapicuOS.get_language_words().other.next;
  }

  get GetBackButtonText(): string{
    return NapicuOS.get_language_words().other.back;
  }

  checkSubmit(): boolean {
    return this.done;
  }

  submit(): void | welcomeUserInstallationDataMetadata {
    return undefined;
  }
}

