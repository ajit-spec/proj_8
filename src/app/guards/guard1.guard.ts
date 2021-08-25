import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Service4Service} from "../services/service4.service";

@Injectable({
  providedIn: 'root'
})
export class Guard1Guard implements CanActivate {

  constructor(
    public service4: Service4Service,
    public router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.service4.isauthenticated()) {
      return true
    }

    this.router.navigate(['/'])
    return false

  }

}
