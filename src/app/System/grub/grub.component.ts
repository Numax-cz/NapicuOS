import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeyMaps} from 'src/app/Config/KeyMaps';
import {Boot} from 'src/app/Scripts/exit/Boot';
import {System} from 'src/app/Sys/System';

@Component({
  selector: 'app-grub',
  templateUrl: './grub.component.html',
  styleUrls: ['./grub.component.scss'],
})
export class GrubComponent implements OnInit, OnDestroy {
  constructor() {
  }

  /**
   * Number indicates the selected options
   */
  public selected: number = 0;

  /**
   * Loaded all systems from the drive
   */
  public static Systems: System[];

  public static ActiveSystem: System;

  ngOnInit(): void {
    this.setEvents();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.Move, true);
    this.selected = 0;
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.Move, true);
    window.addEventListener('keydown', this.Move, true);
  }

  public Move = (e: KeyboardEvent): void => {
    if (e.keyCode == KeyMaps.ArrowUp) {
      if (this.selected > 0) {
        this.selected -= 1;
      }
    } else if (e.keyCode == KeyMaps.ArrowDown) {
      if (this.selected < GrubComponent.Systems.length - 1) {
        this.selected += 1;
      }
    } else if (e.keyCode == KeyMaps.Enter) {
      this.Enter();
    }
  };

  /**
   * The function that is invoked when the selection is complete
   */
  public Enter(): void {
    GrubComponent.ActiveSystem = GrubComponent.Systems[this.selected];
    Boot();
  }

  /**
   *Returns all system names from the drive
   * @param {System} system - Array of all systems
   * @returns {string} System name
   */
  public SystemName(system: System): string {
    return system.constructor.name;
  }

  /**
   * Returns all systems from the unit
   */
  get Systems(): System[] {
    return GrubComponent.Systems;
  }
}
