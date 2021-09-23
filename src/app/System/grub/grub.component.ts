import { Component, OnDestroy, OnInit } from '@angular/core';
import * as key from 'src/app/Config/KeyMaps';
import { System } from 'src/app/Sys/System';
import { LoadsComponent } from '../loads/loads.component';

@Component({
  selector: 'app-grub',
  templateUrl: './grub.component.html',
  styleUrls: ['./grub.component.scss'],
})
export class GrubComponent implements OnInit, OnDestroy {
  constructor() {}

  protected selected: number = 0;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.Move, true);
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.Move, true);
    window.addEventListener('keydown', this.Move, true);
  }

  public Move = (e: KeyboardEvent): void => {
    //TODO check array length
    if (e.keyCode == key.ArrowUp) {
    } else if (e.keyCode == key.ArrowDown) {
    }
  };

  public SystemName(system: System): string {
    return system.constructor.name;
  }
  get Systems(): System[] {
    return LoadsComponent.Systems;
  }
}
