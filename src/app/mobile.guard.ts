import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {BlackscreenComponent} from './Bios/blackscreen/blackscreen.component';
import {animationCursor} from './Scripts/bootloader/text';

@Injectable({
    providedIn: 'root',
})
export class MobileGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            BlackscreenComponent.cursor = new animationCursor();
            BlackscreenComponent.cursor.blinking();
            BlackscreenComponent.text = ['Sorry, your device is not supported for this app.'];
            this.router.navigate(['blackscreen']);
            return false;
        }
        return true;
    }
}
