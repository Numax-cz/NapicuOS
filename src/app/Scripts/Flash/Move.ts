import { BiosComponent } from 'src/app/bios/bios.component';
import { FlashComponent } from 'src/app/flash/flash.component';
import { OptionPanelComponent } from 'src/app/option-panel/option-panel.component';
import { GlobalEvents } from '../GlobalEvents';
import { MoveWindowOptions } from '../MoveWindowOptions';
import { CheckFile } from './CheckFile';
import { FlashBiosExit } from './FlashBiosExit';
import { FlashTab } from './FlashTab';

export const Move = (e: KeyboardEvent) => {
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
  GlobalEvents(e);
};
