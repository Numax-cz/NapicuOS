import {Component, OnInit} from '@angular/core';
import {WelcomeComponent} from "../welcome.component";
import {WelcomeComponentClass} from "../welcomeComponentClass";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends WelcomeComponentClass<null> implements OnInit {
  public data: null = null;


  ngOnInit(): void {
  }


}
