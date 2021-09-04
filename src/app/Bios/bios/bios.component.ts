import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../../Array/BiosMenu';
import { MoveOption } from '../../Scripts/MoveOption';
import { SetWindowOption } from '../../Scripts/SetWindowOption';
import { MoveWindowOptions } from '../../Scripts/MoveWindowOptions';
import { BiosMenu } from '../../interface/BiosMenu';
import { TimeDateSet } from '../../Scripts/TimeDateSet';
import { getCookies } from '../../Scripts/Cookies';
import { BiosInfo, BiosOptionsST, BiosSettings, setSettingsValue } from '../../Array/ToolSettings';
import { BootComponent } from '../boot/boot.component';
import { copy } from '../../Scripts/DeepClone';
import { FlashComponent } from '../flash/flash.component';
import { getLanguage } from '../../Scripts/getLanguage';
import { GlobalEvents } from '../../Scripts/GlobalEvents';
import * as key from 'src/app/Config/KeyMaps';
import { OptionPanelComponent } from '../option-panel/option-panel.component';
import { Loading } from 'src/app/Scripts/LoadingAnimations';
import { cookiesForBisoSettingsAr } from 'src/app/Config/Cookies';
import { GetBiosVersionFromCookies } from 'src/app/Array/FlashInformation';

/**
 * @author Numax-cz
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
  public BiosMenu: BiosMenu[] = Menu;
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
    var SaveBiosArray: BiosOptionsST = copy(BiosSettings);
    //TODO ERROR Screen
    if (JSON.parse(getCookies(cookiesForBisoSettingsAr))) {
      BiosComponent.BiosMenuSavePoint = JSON.parse(getCookies(cookiesForBisoSettingsAr));
      setSettingsValue(BiosComponent.BiosMenuSavePoint);
    } else {
      BiosComponent.BiosMenuSavePoint = SaveBiosArray;
    }
    BiosComponent.BiosRouter = this.router;
  }

  ngOnInit(): void {
    this.setEvents();
    BootComponent.EnterBios = true;
    getLanguage();
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
        if (!OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay) {
          if (e.keyCode == key.ArrowRight && BiosComponent.selected < this.BiosMenu.length - 1) {
            BiosComponent.selected += 1;
            this.UpdateComponent();
          }
          //* ArrowLeft
          if (e.keyCode == key.ArrowLeft && BiosComponent.selected !== 0) {
            BiosComponent.selected -= 1;
            this.UpdateComponent();
          }
          if (!OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay) {
          }
          //* ArrowDown & ArrowUp
          if (e.keyCode == key.ArrowDown || e.keyCode == key.ArrowUp) {
            MoveOption(e.keyCode);
          }
          //* Enter
          if (e.keyCode == key.Enter) {
            SetWindowOption();
          }
        } else {
          if (e.keyCode == key.ArrowDown || e.keyCode == key.ArrowRight || e.keyCode == key.ArrowUp || e.keyCode == key.ArrowLeft) {
            MoveWindowOptions(e.keyCode);
          }
          //* Close --save
          if (e.keyCode == key.Enter) {
            if (OptionPanelComponent.window) OptionPanelComponent.window.CloseSave();
          }
          //* Close --unsavey
          if (e.keyCode == key.Escape) {
            if (OptionPanelComponent.window) OptionPanelComponent.window.CloseUnsave();
          }
          if (BiosComponent.WindowFastOptionDisplay) {
            if (e.keyCode == key.ArrowDown || (key.ArrowUp && OptionPanelComponent.window)) {
              TimeDateSet(e.keyCode, OptionPanelComponent.window?.WindowItems as any);
            }
          }
        }
      }, 55);
    }
    GlobalEvents(e);
  };

  public UpdateComponent(): void {
    this.router.navigate([`bios/`, this.BiosMenu[BiosComponent.selected].router], { skipLocationChange: true });
    BiosComponent.BiosRouter = this.router;
  }

  get Display(): boolean {
    return OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay ? true : false;
  }

  get Descriptions(): string {
    return 'xd';
  }

  get biosVersion(): string {
    return BiosInfo.version;
  }

  get biosDate(): string {
    return BiosInfo.date;
  }
}

