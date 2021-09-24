import { Component, OnDestroy, OnInit } from '@angular/core';
import * as key from 'src/app/Config/KeyMaps';
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

  public selected: number = 0;

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
      if (this.selected < LoadsComponent.Systems.length - 1) {
        this.selected += 1;
      }
    } else if (e.keyCode == key.Enter) {
      this.Enter();
    }
  };

  public Enter(): void {
    if (!LoadsComponent.Systems[this.selected]) return;
    LoadsComponent.Systems = [LoadsComponent.Systems[this.selected]];
    this.Exit();
  }

  public Exit(): void {
    Loading('/booting', 500, 200); //TODO Time to config
  }

  public SystemName(system: System): string {
    return system.constructor.name;
  }
  get Systems(): System[] {
    return LoadsComponent.Systems;
  }
}
