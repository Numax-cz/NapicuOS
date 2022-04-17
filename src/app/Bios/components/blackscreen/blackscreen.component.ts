import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeyMaps} from 'src/app/Bios/Config/KeyMaps';
import {animationCursor} from 'src/app/Bios/Scripts/bootloader/text';
import {Reboot} from 'src/app/Bios/Scripts/exit/Reboot';

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

  get text(): any {
    return BlackscreenComponent.text;
  }

  ngOnInit(): void {
    this.setEvents();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.Move, true);
    this.clearCursor1();
    BlackscreenComponent.text = [];
  }

  public Move = (e: KeyboardEvent): void => {
    if (e.keyCode == KeyMaps.F1) {
      Reboot();
      e.preventDefault();
    }
  };

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
}
