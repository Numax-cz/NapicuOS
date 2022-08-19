import { Component, OnInit } from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {


  public toShow: string = '';

  public buttons = [
    '÷',
    1, 2, 3, '*',
    4, 5, 6, '+',
    7, 8, 9, '-',
    '.', 0
  ]


  constructor() {
  }

  ngOnInit(): void {
  }

  public add(event: MouseEvent): void {
    let i = event.srcElement as HTMLElement;
    this.toShow += i.innerText;
  }

  public calc(): void {
    this.toShow = eval(this.toShow); //Dude eval is the best SAFE function ever YOLOOO
  }

  public clear(): void {
    this.toShow = '';
  }

  public delete(): void {
    this.toShow = this.toShow.slice(0, -1);
  }
}
