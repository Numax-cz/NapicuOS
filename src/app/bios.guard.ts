import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {BootComponent} from './Bios/components/boot/boot.component';

@Injectable({
  providedIn: 'root',
})
export class BiosGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (BootComponent.EnterBios) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
