import {
  animate,
  query,
  stagger, state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/Sys/Process';
import {boot_animation_time} from '../../config/boot';
import {wallpaper} from '../../config/wallpaper';
import {system_dock_animations} from '../../config/systemAnimations';
import {NapicuOS} from '../../system.napicuos';
import {SystemFile} from 'src/app/Sys/File';
import {System} from "../../../../System";
import {SystemDockDisplay} from "../../interface/System/dock";
import {window_animations} from "../../config/windowAnimations";

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
    window.addEventListener('mousedown', (e: MouseEvent) => {
      this.selectedAppContext = null;
      e.preventDefault();
    });
  }

  public dockRunner(file: SystemFile, running: boolean): void {
    if (!running) {
      NapicuOS.open_app(file.fileName);
    }
    alert('xd')
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
