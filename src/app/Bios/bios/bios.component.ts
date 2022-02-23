import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {MoveOption} from '../../Scripts/MoveOption';
import {SetWindowOption} from '../../Scripts/SetWindowOption';
import {MoveWindowOptions} from '../../Scripts/MoveWindowOptions';
import {BiosMenu} from '../../interface/BiosMenu';
import {TimeDateSet} from '../../Scripts/TimeDateSet';
import {BiosInfo, BiosOptionsST} from '../../Array/ToolSettings';
import {BootComponent} from '../boot/boot.component';
import {FlashComponent} from '../flash/flash.component';
import {GlobalEvents} from '../../Scripts/GlobalEvents';
import {KeyMaps} from 'src/app/Config/KeyMaps';
import {OptionPanelComponent} from '../option-panel/option-panel.component';
import {setCookiesBiosinf} from 'src/app/Array/FlashInformation';
import {getMenu} from 'src/app/Array/BiosMenu';

/**
 * @author Numax
 * @version 1.2.0
 */

@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit, OnDestroy {
  public static BiosRouter: Router;
  /**
   * All items displayed in the top panel
   */
  public BiosMenu: BiosMenu[] = getMenu();
  /**
   * Saves bios settings before changing
   */
  public static BiosMenuSavePoint: BiosOptionsST;
  /**
   * Specifies which screen is selected
   */
  public static selected: number = 0;
  /**
   * Specifies whether the quick select option is open or closed (Option-Panel)
   */
  public static WindowFastOptionDisplay: boolean = false;
  /**
   * Specifies which item is selected in the popup window (Option-Panel)
   */
  public static WindowSelectedOption: number = 0;

  constructor(@Inject(DOCUMENT) private doc: Document, private router: Router) {
    BiosComponent.BiosRouter = this.router;
  }

  ngOnInit(): void {
    this.setEvents();
    BootComponent.EnterBios = true;
    setCookiesBiosinf();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.Move, true);
    BiosComponent.selected = 0;
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.Move, true);
    window.addEventListener('keydown', this.Move, true);
  }

  get selected(): number {
    return BiosComponent.selected;
  }

  public Move = (e: KeyboardEvent): void => {
    if (BootComponent.EnterBios && !FlashComponent.ezFlashWindow) {
      setTimeout(() => {
        //* ArrowRight
        if (
          !OptionPanelComponent.window &&
          !BiosComponent.WindowFastOptionDisplay
        ) {
          if (
            e.keyCode == KeyMaps.ArrowRight &&
            BiosComponent.selected < this.BiosMenu.length - 1
          ) {
            BiosComponent.selected += 1;
            this.UpdateComponent();
          }
          //* ArrowLeft
          if (e.keyCode == KeyMaps.ArrowLeft && BiosComponent.selected !== 0) {
            BiosComponent.selected -= 1;
            this.UpdateComponent();
          }
          if (
            !OptionPanelComponent.window &&
            !BiosComponent.WindowFastOptionDisplay
          ) {
          }
          //* ArrowDown & ArrowUp
          if (e.keyCode == KeyMaps.ArrowDown || e.keyCode == KeyMaps.ArrowUp) {
            MoveOption(e.keyCode);
          }
          //* Enter
          if (e.keyCode == KeyMaps.Enter) {
            SetWindowOption();
          }
        } else {
          if (
            e.keyCode == KeyMaps.ArrowDown ||
            e.keyCode == KeyMaps.ArrowRight ||
            e.keyCode == KeyMaps.ArrowUp ||
            e.keyCode == KeyMaps.ArrowLeft
          ) {
            MoveWindowOptions(e.keyCode);
          }
          //* Close --save
          if (e.keyCode == KeyMaps.Enter) {
            if (OptionPanelComponent.window)
              OptionPanelComponent.window.CloseSave();
          }
          //* Close --unsavey
          if (e.keyCode == KeyMaps.Escape) {
            if (OptionPanelComponent.window)
              OptionPanelComponent.window.CloseUnsave();
          }
          if (BiosComponent.WindowFastOptionDisplay) {
            if (
              e.keyCode == KeyMaps.ArrowDown ||
              (KeyMaps.ArrowUp && OptionPanelComponent.window)
            ) {
              TimeDateSet(
                e.keyCode,
                OptionPanelComponent.window?.WindowItems as any
              );
            }
          }
        }
      }, 55);
    }
    GlobalEvents(e);
  };

  public UpdateComponent(): void {
    this.router.navigate(
      [`bios/`, this.BiosMenu[BiosComponent.selected].router],
      {skipLocationChange: true}
    );
    BiosComponent.BiosRouter = this.router;
  }

  get Display(): boolean {
    return !!(OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay);
  }

  get biosVersion(): string {
    return BiosInfo.version;
  }

  get biosDate(): string {
    return BiosInfo.date;
  }
}
