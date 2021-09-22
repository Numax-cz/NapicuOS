import { Component, OnInit } from '@angular/core';
import { System } from 'src/app/Sys/System';
import { LoadsComponent } from '../loads/loads.component';

@Component({
  selector: 'app-grub',
  templateUrl: './grub.component.html',
  styleUrls: ['./grub.component.scss'],
})
export class GrubComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get Systems(): System[] {
    return LoadsComponent.Systems
  }

  public SystemName(system: System): string{
    return system.constructor.name;
  }
}
