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
    let roleValue = tokenPayload.role || tokenPayload.Role;

    if (!this.auth.isAuthenticated() || roleValue !== expectedRole) {
      this.router.navigate(['menu/burger']);
      return false;
    }
    return true;
  }

  public checkRole(role: string): boolean {
    const token = localStorage.getItem('token')!;
    const tokenPayload: any = decode(token);

    let roleValue = tokenPayload.role || tokenPayload.Role;

    if (!this.auth.isAuthenticated() || roleValue !== role) {
      return false;
    }
    return true;
  }
}
