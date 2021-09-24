import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token')!;
    // decode the token to get its payload
    const tokenPayload: any = decode(token);

    if (!this.auth.isAuthenticated() || tokenPayload.Role !== expectedRole) {
      this.router.navigate(['menu/burger']);
      return false;
    }
    return true;
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('token')!;
    const tokenPayload: any = decode(token);

    if (!this.auth.isAuthenticated() || tokenPayload.Role !== 'admin') {
      return false;
    }
    return true;
  }
}
