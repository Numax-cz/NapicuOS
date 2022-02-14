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

  public declare apps: SystemDockDisplay[];

  constructor() {
  }

  ngOnInit(): void {
    NapicuOSComponent.BottomDockDisplay = true;
    window.addEventListener('mousedown', (e: MouseEvent) => {
      this.selectedAppContext = null;
      e.preventDefault();
    });
    this.apps = this.GetitemsInDock;
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

  get SystemBoot(): boolean {
    return NapicuOS.get_system_boot();
  }

  get Process(): Process[] {
    return NapicuOS.get_system_process();
  }

  get GetitemsInDock(): SystemDockDisplay[] {
    let appsInDock: SystemDockDisplay[] = NapicuOS.get_apps_in_dock().map((value: SystemFile) => {
      return {
        file: value,
        alreadyPinned: true,
        running: !!NapicuOS.get_system_displayed_window_apps_by_process_title(value.fileName).length,
        selected: (NapicuOS.get_system_activated_window_app()?.processTitle === value.fileName)
      };
    });

    let activeApps: SystemDockDisplay[] = this.GetRunningAppsInDock.map((value: SystemFile) => {
      return {
        file: value,
        alreadyPinned: false,
        running: true,
        selected: NapicuOS.get_system_activated_window_app().processTitle === value.fileName
      }
    });

    return [...new Set([...appsInDock, ...activeApps])];
  }

  protected get GetRunningAppsInDock(): SystemFile[] {
    let i: SystemFile[] = [];
    NapicuOS.get_system_displayed_window_apps().forEach((App: Process) => {
      let file = NapicuOS.get_file_by_file_title(NapicuOS.get_apps_dir(), App.processTitle);
      if (typeof file === "object" && NapicuOS.get_apps_in_dock().filter((file: SystemFile) => {
        return file.fileName === App.processTitle;
      }).length === 0) i.push(file);
    })
    return i;
  }

  get BottomDockDisplay(): boolean {
    return NapicuOS.get_system_bottom_dock_display();
  }
}
