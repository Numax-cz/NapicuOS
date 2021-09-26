import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { GrubComponent } from '../grub/grub.component';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {
  public static SysComponent: Type<any> = GrubComponent;

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  get Component(): Type<any> {
    //TODO If component... else return error component 
    return SystemComponent.SysComponent;
  }
}
