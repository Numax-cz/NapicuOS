import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemComponent } from './System/system/system.component';
import { GrubComponent } from './System/grub/grub.component';

@Injectable({
  providedIn: 'root',
})
export class SystemGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (GrubComponent.ActiveSystem) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
