import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadsComponent } from './System/loads/loads.component';
import { SystemComponent } from './System/system/system.component';

@Injectable({
  providedIn: 'root',
})
export class BootingGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (SystemComponent.System) {
      if (!SystemComponent.System.boot.logo) {
        console.error('The system logo is not set');
        return false;
      }
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
