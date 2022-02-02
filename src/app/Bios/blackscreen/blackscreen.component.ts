import {Component, OnDestroy, OnInit} from '@angular/core';
import * as key from 'src/app/Config/KeyMaps';
import {animationCursor} from 'src/app/Scripts/bootloader/text';
import {Reboot} from 'src/app/Scripts/exit/Reboot';

@Component({
    selector: 'app-blackscreen',
    templateUrl: './blackscreen.component.html',
    styleUrls: ['./blackscreen.component.scss'],
})
export class BlackscreenComponent implements OnInit, OnDestroy {
    /**
     * Text to be displayed on the black screen
     */
    public static text: string[];
    public static cursor: animationCursor | null;

    constructor() {
    }

    ngOnInit(): void {
        this.setEvents();
    }

    ngOnDestroy(): void {
        window.removeEventListener('keydown', this.Move, true);
        this.clearCursor1();
        BlackscreenComponent.text = [];
    }

    /**
     * Clears the cursor
     */
    protected clearCursor1(): void {
        BlackscreenComponent.cursor?.stop();
        BlackscreenComponent.cursor = null;
    }

    /**
     * Sets the event keyup
     */
    protected setEvents(): void {
        window.removeEventListener('keydown', this.Move, true);
        window.addEventListener('keydown', this.Move, true);
    }

    public Move = (e: KeyboardEvent): void => {
        if (e.keyCode == key.F1) {
            Reboot();
            e.preventDefault();
        }
    };

    get text(): any {
        return BlackscreenComponent.text;
    }
}
