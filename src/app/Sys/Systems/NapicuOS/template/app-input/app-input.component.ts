import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent implements OnInit {
  public declare inputValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  public reject(){

  }

  public submit(){

  }

}
