import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeyMaps} from 'src/app/Bios/Config/KeyMaps';
import {Boot} from 'src/app/Bios/Scripts/exit/Boot';
import {System} from 'src/app/Sys/Systems/NapicuOS/SystemComponents/System';

@Component({
  selector: 'app-grub',
  templateUrl: './grub.component.html',
  styleUrls: ['./grub.component.scss'],
})
export class GrubComponent implements OnInit, OnDestroy {
  /**
   * Loaded all systems from the drive
   */
  public static GrubSystems: System[];
  /**
   * Active system variable
   */
  public static GrubActiveSystem: System;
  /**
   * Number indicates the selected options
   */
  public selected: number = 0;

  constructor() {
  }

  /**
   * Returns all systems from the unit
   */
  get GetGrubSystems(): System[] {
    return GrubComponent.GrubSystems;
  }

  ngOnInit(): void {
    this.setEvents();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.Move, true);
    this.selected = 0;
  }

  public Move = (e: KeyboardEvent): void => {
    if (e.keyCode == KeyMaps.ArrowUp) {
      if (this.selected > 0) {
        this.selected -= 1;
      }
    } else if (e.keyCode == KeyMaps.ArrowDown) {
      if (this.selected < GrubComponent.GrubSystems.length - 1) {
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
    GrubComponent.GrubActiveSystem = GrubComponent.GrubSystems[this.selected];
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
   * Sets the events for the component
   */
  protected setEvents(): void {
    window.removeEventListener('keydown', this.Move, true);
    window.addEventListener('keydown', this.Move, true);
  }
}
