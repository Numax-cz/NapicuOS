import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../Array/BiosMenu';

import { MoveOption } from '../Scripts/MoveOption';
import { OpenWindowOption } from '../Scripts/OpenWindowOption';
import {
  CloseWindowOptionUnsave,
  CloseWindowOptionSave,
} from '../Scripts/CloseWindowOption';
import { MoveWindowOptions } from '../Scripts/MoveWindowOptions';
import { BiosMenu } from '../interface/BiosMenu';
import { Options } from '../interface/ToolSettings';
@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit {
  //Main
  public static selectedComponent: any;
  public static selected: number = 0;
  public BiosMenu: BiosMenu[] = Menu;

  //PopUp Alert
  public static MoreNevim: Options[] | Date[] = [];
  public static WindowItems: Options[] | Date[];
  public static WindowDisplay: boolean = false;
  public static WindowFastOptionDisplay: boolean = false;
  public static WindowSelectedOption: number = 0;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => this.Move(e));
  
  }

  get selected(): number {
    return BiosComponent.selected;
  }
  public Activate(e: any): void {
    BiosComponent.selectedComponent = e;
  }

  public Move = (e: KeyboardEvent): void => {
    setTimeout(() => {
      //ArrowRight
      if (!BiosComponent.selectedComponent) return;
      if (
        !BiosComponent.WindowDisplay &&
        !BiosComponent.WindowFastOptionDisplay
      ) {
        if (
          e.keyCode == 39 &&
          BiosComponent.selected < this.BiosMenu.length - 1
        ) {
          BiosComponent.selected += 1;
          this.UpdateComponent();
        }
        //ArrowLeft
        if (e.keyCode == 37 && BiosComponent.selected !== 0) {
          BiosComponent.selected -= 1;
          this.UpdateComponent();
        }
        if (
          !BiosComponent.WindowDisplay &&
          !BiosComponent.WindowFastOptionDisplay
        ) {
        }
        //ArrowDown & ArrowUp
        if (e.keyCode == 40 || e.keyCode == 38) {
          MoveOption(BiosComponent.selectedComponent, e.keyCode);
        }
        //Enter
        if (e.keyCode == 13) {
          OpenWindowOption(BiosComponent.selectedComponent);
        }
      } else {
        // TODO Add WindowFastOptionDisplay
        if (e.keyCode == 40 || e.keyCode == 38) {
          //Move
          MoveWindowOptions(e.keyCode);
        }
        //Close --save
        if (e.keyCode == 13) {
          CloseWindowOptionSave(BiosComponent.selectedComponent);
        }
        //Close --unsavey
        if (e.keyCode == 27) {
          CloseWindowOptionUnsave(BiosComponent.selectedComponent);
        }
      }
    }, 55);
  };
  public UpdateComponent(): void {
    this.router.navigate(
      [`bios/${this.BiosMenu[BiosComponent.selected].router}`],
      { skipLocationChange: true }
    );
  }
  get Display(): boolean {
    return BiosComponent.WindowDisplay;
  }
}
