import {Component, OnInit} from '@angular/core';
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {NapicuOS} from "../../../system.napicuos";

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
}
