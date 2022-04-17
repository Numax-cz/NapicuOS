import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {GrubComponent} from './Grub/grub/grub.component';

@Injectable({
  providedIn: 'root',
})
export class GrubGuard implements CanActivate {
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
    if (GrubComponent.GrubSystems) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
