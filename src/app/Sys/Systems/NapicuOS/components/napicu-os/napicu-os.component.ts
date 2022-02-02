import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/Sys/Process';
import {boot_animation_time} from '../../config/boot';
import {wallpaper} from '../../config/wallpaper';
import {system_dock_animations} from '../../config/systemAnimations';
import {NapicuOS} from '../../system.napicuos';
import {SystemFile} from 'src/app/Sys/File';

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
                            transformOrigin: 'bottom'
                        }),
                        animate(`${boot_animation_time}ms ease-in-out`),
                    ])
                ),
            ]),
        ]),
        trigger('NapicuOSDockAnimation', [
            transition(':enter', [
                style({transform: 'translateY(100px)'}),
                animate(system_dock_animations, style({transform: 'translateY(0)'})),
            ]),
            transition(':leave', [
                style({transform: 'translateY(0)'}),
                animate(system_dock_animations, style({transform: 'translateY(100px)'})),
            ]),
        ]),
    ],
})
export class NapicuOSComponent implements OnInit {
    /**
     * Determines if the bottom dock is displayed
     */
    public static BottomDockDisplay: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        NapicuOSComponent.BottomDockDisplay = true;
    }

    public dockRunner(file: SystemFile): void {
        file.open();
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

    get GetitemsInDock(): SystemFile[] {
        return NapicuOS.get_apps_in_dock();
    }

    get BottomDockDisplay(): boolean {
        return NapicuOS.get_system_bottom_dock_display();
    }
}
