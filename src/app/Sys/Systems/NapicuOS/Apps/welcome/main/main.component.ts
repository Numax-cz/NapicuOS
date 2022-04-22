import {Component, OnInit} from '@angular/core';
import {WelcomeComponent} from "../welcome.component";
import {WelcomeComponentClass} from "../WelcomeComponentClass";

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
}
