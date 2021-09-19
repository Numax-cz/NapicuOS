import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BlackscreenComponent } from './Bios/blackscreen/blackscreen.component';
import { LoadsComponent } from './System/loads/loads.component';

@Injectable({
  providedIn: 'root',
})
export class SystemGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (LoadsComponent.Systems) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
