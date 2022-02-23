import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/Sys/Process';
import {boot_animation_time} from '../../config/boot';
import {wallpaper} from '../../config/wallpaper';
import {NapicuOS} from '../../system.napicuos';
import {SystemFile} from 'src/app/Sys/File';
import {SystemDockDisplay} from "../../interface/System/dock";
import {WindowComponent} from "../../template/window/window.component";
import {global} from "@angular/compiler/src/util";
import {Window} from "../../../../Window";

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
  animations: [
    trigger('NapicuOSfeoreStartUp', [
      transition('* => *', [
        query(
          ':self',
          stagger('20ms', [
            style({
              transform: 'scale(0.2) rotateX(70deg)',
              opacity: 0,
              transformOrigin: 'bottom',
            }),
            animate(`${boot_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
  ],
})
export class NapicuOSComponent implements OnInit {
  /**
   * Determines if the bottom dock is displayed
   */
  public static BottomDockDisplay: boolean = false;

  public selectedAppContext: number | null = null;

  public static BottomDockProcess: SystemDockDisplay[] = [];

  constructor() {
  }

  ngOnInit(): void {
    NapicuOSComponent.BottomDockDisplay = true;
    // window.addEventListener('mousedown', (e: MouseEvent) => {
    //   this.selectedAppContext = null;
    //   e.preventDefault();
    // });
  }

  public dockRunner(file: SystemFile, running: boolean): void {

    if (!running) {
      NapicuOS.open_app(file.fileName);
    } else {
      //TODO OPEN;

      let p = NapicuOS.get_apps_running_by_process_title(file.fileName)[0];
      let i = WindowComponent.WindowHistory.indexOf(p.Window);
      WindowComponent.WindowHistory.splice(i, 1);
      WindowComponent.WindowHistory.push(p.Window);
      WindowComponent.WindowHistory[WindowComponent.WindowHistory.length - 1].activated = false;
      console.log(WindowComponent.WindowHistory[WindowComponent.WindowHistory.length - 1])
      WindowComponent.WindowHistory.forEach((element: Window, index: number) => {
        element.z_index = index;
      });
      p.Window.activated = true;
    }
  }

  public onRightClick(index: number, event: Event): void {
    this.selectedAppContext = index;
    event.preventDefault();
  }

  get systemTime(): string {
    return NapicuOS.get_system_time();
  }

  get wallpaper(): string {
    return wallpaper;
  }

  get GetBottomDockProcess(): SystemDockDisplay[] {
    return NapicuOSComponent.BottomDockProcess;
  }

  get SystemBoot(): boolean {
    return NapicuOS.get_system_boot();
  }

  get Process(): Process[] {
    return NapicuOS.get_system_process();
  }

  get BottomDockDisplay(): boolean {
    return NapicuOS.get_system_bottom_dock_display();
  }
}
