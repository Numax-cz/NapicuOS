import {Component, OnDestroy, OnInit, Type} from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {
  public static SystemComponent: Type<any>;

  get Component(): Type<any> {
    return SystemComponent.SystemComponent;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
