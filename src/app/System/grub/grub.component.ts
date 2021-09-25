import { Component, OnDestroy, OnInit } from '@angular/core';
import { drive } from 'src/app/Array/Drives';
import * as key from 'src/app/Config/KeyMaps';
import { Boot } from 'src/app/Scripts/exit/Boot';
import { Loading } from 'src/app/Scripts/LoadingAnimations';
import { System } from 'src/app/Sys/System';
import { LoadsComponent } from '../loads/loads.component';

@Component({
  selector: 'app-grub',
  templateUrl: './grub.component.html',
  styleUrls: ['./grub.component.scss'],
})
export class GrubComponent implements OnInit, OnDestroy {
  constructor() {}
  /**
   * Number indicates the selected options
   */
  public selected: number = 0;
  /**
   * Loaded all systems from the drive
   */
  public static Systems: System[];

  ngOnInit(): void {
    this.setEvents();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.Move, true);
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.Move, true);
    window.addEventListener('keydown', this.Move, true);
  }

  public Move = (e: KeyboardEvent): void => {
    if (e.keyCode == key.ArrowUp) {
      if (this.selected > 0) {
        this.selected -= 1;
      }
    } else if (e.keyCode == key.ArrowDown) {
      if (this.selected < GrubComponent.Systems.length - 1) {
        this.selected += 1;
      }
    } else if (e.keyCode == key.Enter) {
      this.Enter();
    }
  };

  /**
   * The function that is invoked when the selection is complete
   */
  public Enter(): void {
    LoadsComponent.Systems = GrubComponent.Systems[this.selected];
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
