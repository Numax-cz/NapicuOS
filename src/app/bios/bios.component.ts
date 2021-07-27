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
import { WindowItems } from '../Scripts/Type';
import { TimeDateSet } from '../Scripts/TimeDateSet';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';
@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit {
  //Main
  public static selectedComponent: any; //TODO
  public static selected: number = 0;
  public BiosMenu: BiosMenu[] = Menu;

  //PopUp Alert
  public static WindowItems: WindowItems;
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
        BiosComponent.WindowItems = [];
        BiosComponent.WindowSelectedOption = 0;
        if (
          e.keyCode == 39 &&
          BiosComponent.selected < this.BiosMenu.length - 1
        ) {
          BiosComponent.selected += 1;
          this.UpdateComponent();
        }
        //* ArrowLeft
        if (e.keyCode == 37 && BiosComponent.selected !== 0) {
          BiosComponent.selected -= 1;
          this.UpdateComponent();
        }
        if (
          !BiosComponent.WindowDisplay &&
          !BiosComponent.WindowFastOptionDisplay
        ) {
        }
        //* ArrowDown & ArrowUp
        if (e.keyCode == 40 || e.keyCode == 38) {
          MoveOption(e.keyCode);
        }
        //* Enter
        if (e.keyCode == 13) {
          OpenWindowOption();
        }
      } else {
        if (
          e.keyCode == 40 ||
          e.keyCode == 39 ||
          e.keyCode == 38 ||
          e.keyCode == 37
        ) {
          MoveWindowOptions(e.keyCode);
        }
        //* Close --save
        if (e.keyCode == 13) {
          CloseWindowOptionSave();
        }
        //* Close --unsavey
        if (e.keyCode == 27) {
          CloseWindowOptionUnsave();
        }
        if (BiosComponent.WindowFastOptionDisplay) {
          if (e.keyCode == 40 || 38) {
            TimeDateSet(e.keyCode, BiosComponent.WindowItems as any);
          }
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
