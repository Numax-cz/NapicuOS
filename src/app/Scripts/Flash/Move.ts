import {BiosComponent} from 'src/app/Bios/bios/bios.component';
import {FlashComponent} from 'src/app/Bios/flash/flash.component';
import {OptionPanelComponent} from 'src/app/Bios/option-panel/option-panel.component';
import * as key from 'src/app/Config/KeyMaps';
import {GlobalEvents} from '../GlobalEvents';
import {MoveWindowOptions} from '../MoveWindowOptions';
import {CheckFile} from './CheckFile';
import {FlashBiosExit} from './FlashBiosExit';
import {FlashTab} from './FlashTab';

export const Move = (e: KeyboardEvent) => {
    if (FlashComponent.ezFlashWindow) {
        //TODO FIX - Clear if...else
        if (!OptionPanelComponent.window && !BiosComponent.WindowFastOptionDisplay && !FlashComponent.Flashing) {
            if (e.keyCode == key.ArrowDown || e.keyCode == key.End) {
                if (
                    FlashComponent.SelectedWindow == 0 &&
                    FlashComponent.SelectedDir < FlashComponent.FlashDrive.length - 1
                ) {
                    FlashComponent.SelectedDir += 1;

                    FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
                } else if (
                    FlashComponent.SelectedWindow == 1 &&
                    FlashComponent.SelectedFile < FlashComponent.listDir.length - 1
                ) {
                    FlashComponent.SelectedFile += 1;
                    var ScrollY = FlashComponent.Scroll.scrollTop;
                    FlashComponent.Scroll.scrollTo(0, ScrollY + 26);
                }
            } else if (e.keyCode == key.ArrowUp || e.keyCode == key.Home) {
                if (FlashComponent.SelectedWindow == 0 && FlashComponent.SelectedDir !== 0) {
                    FlashComponent.SelectedDir -= 1;

                    FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
                } else if (FlashComponent.SelectedWindow == 1 && FlashComponent.SelectedFile > 0) {
                    FlashComponent.SelectedFile -= 1;

                    var ScrollY = FlashComponent.Scroll.scrollTop;
                    FlashComponent.Scroll.scrollTo(0, ScrollY - 26);
                }
            } else if (e.keyCode == key.Tab) {
                FlashTab();
                e.preventDefault(); //TODO Move => End
            } else if (e.keyCode == key.Escape) {
                FlashBiosExit();
            } else if (e.keyCode == key.Enter) {
                //* Enter
                if (FlashComponent.SelectedWindow == 1) {
                    CheckFile();
                }
            }
        } else if (e.keyCode == key.Enter) {
            if (OptionPanelComponent.window) OptionPanelComponent.window.CloseSave();
        } else if (
            e.keyCode == key.ArrowDown ||
            e.keyCode == key.ArrowRight ||
            e.keyCode == key.ArrowUp ||
            e.keyCode == key.ArrowLeft
        ) {
            MoveWindowOptions(e.keyCode);
        }
    }
    GlobalEvents(e);
};
