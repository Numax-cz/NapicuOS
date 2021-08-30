import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '../Array/BiosMenu';
import { MoveOption } from '../Scripts/MoveOption';
import { SetWindowOption } from '../Scripts/SetWindowOption';
import { MoveWindowOptions } from '../Scripts/MoveWindowOptions';
import { BiosMenu } from '../interface/BiosMenu';
import { WindowItems } from '../Scripts/Type';
import { TimeDateSet } from '../Scripts/TimeDateSet';
import { getCookies } from '../Scripts/Cookies';
import { BiosInfo, BiosOptionsST, BiosSettings, setSettingsValue } from '../Array/ToolSettings';
import { BootComponent } from '../boot/boot.component';
import { copy } from '../Scripts/DeepClone';
import { FlashComponent } from '../flash/flash.component';
import { FlashBiosExit } from '../Scripts/Flash/FlashBiosExit';
import { FlashTab } from '../Scripts/Flash/FlashTab';
import { CheckFile } from '../Scripts/Flash/CheckFile';
import { OptionPanelComponent } from '../option-panel/option-panel.component';

/**
 * @author Numax-cz
 * @version 1.2.0
 */

@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit {
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
    if (JSON.parse(getCookies('BiosSettingsArray'))) {
      BiosComponent.BiosMenuSavePoint = JSON.parse(getCookies('BiosSettingsArray'));
      setSettingsValue(BiosComponent.BiosMenuSavePoint);
    } else {
      BiosComponent.BiosMenuSavePoint = SaveBiosArray;
    }

    BiosComponent.BiosRouter = this.router;
  }

  ngOnInit(): void {
    window.removeEventListener('keydown', this.Move, true);
    window.addEventListener('keydown', this.Move, true);
    BootComponent.EnterBios = true;
  }

  get selected(): number {
    return BiosComponent.selected;
  }

  public Move = (e: KeyboardEvent): void => {
    if (BootComponent.EnterBios && !FlashComponent.ezFlashWindow) {
      setTimeout(() => {
        //* ArrowRight
        if (!OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay) {
          if (e.keyCode == 39 && BiosComponent.selected < this.BiosMenu.length - 1) {
            BiosComponent.selected += 1;
            this.UpdateComponent();
          }
          //* ArrowLeft
          if (e.keyCode == 37 && BiosComponent.selected !== 0) {
            BiosComponent.selected -= 1;
            this.UpdateComponent();
          }
          if (!OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay) {
          }
          //* ArrowDown & ArrowUp
          if (e.keyCode == 40 || e.keyCode == 38) {
            MoveOption(e.keyCode);
          }
          //* Enter
          if (e.keyCode == 13) {
            SetWindowOption();
          }
        } else {
          if (e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 37) {
            MoveWindowOptions(e.keyCode);
          }
          //* Close --save
          if (e.keyCode == 13) {
            if (OptionPanelComponent.window) OptionPanelComponent.window.CloseSave();
          }
          //* Close --unsavey
          if (e.keyCode == 27) {
            if (OptionPanelComponent.window) OptionPanelComponent.window.CloseUnsave();
          }
          if (BiosComponent.WindowFastOptionDisplay) {
            if (e.keyCode == 40 || (38 && OptionPanelComponent.window)) {
              TimeDateSet(e.keyCode, OptionPanelComponent.window?.WindowItems as any);
            }
          }
        }
      }, 55);
    }
    if (FlashComponent.ezFlashWindow) {
      //TODO FIX
      if (!OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay && !FlashComponent.Flashing) {
        if (e.keyCode == 40 || e.keyCode == 35) {
          if (FlashComponent.SelectedWindow == 0 && FlashComponent.SelectedDir < FlashComponent.FlashDrive.length - 1) {
            FlashComponent.SelectedDir += 1;

            FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
          } else if (FlashComponent.SelectedWindow == 1 && FlashComponent.SelectedFile < FlashComponent.listDir.length - 1) {
            FlashComponent.SelectedFile += 1;
            var ScrollY = FlashComponent.Scroll.scrollTop;
            FlashComponent.Scroll.scrollTo(0, ScrollY + 26);
          }
        } else if (e.keyCode == 38 || e.keyCode == 36) {
          if (FlashComponent.SelectedWindow == 0 && FlashComponent.SelectedDir !== 0) {
            FlashComponent.SelectedDir -= 1;

            FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
          } else if (FlashComponent.SelectedWindow == 1 && FlashComponent.SelectedFile > 0) {
            FlashComponent.SelectedFile -= 1;

            var ScrollY = FlashComponent.Scroll.scrollTop;
            FlashComponent.Scroll.scrollTo(0, ScrollY - 26);
          }
        } else if (e.keyCode == 9) {
          //TODO FLASH TAB
          FlashTab();
          e.preventDefault(); //TODO Move => End
        } else if (e.keyCode == 27) {
          FlashBiosExit();
        } else if (e.keyCode == 13) {
          //* Enter
          if (FlashComponent.SelectedWindow == 1) {
            CheckFile();
          }
        }
      } else if (e.keyCode == 13) {
        if (OptionPanelComponent.window) OptionPanelComponent.window.CloseSave();
      } else if (e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 38 || e.keyCode == 37) {
        MoveWindowOptions(e.keyCode);
      }
    }
    //e.preventDefault();
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
