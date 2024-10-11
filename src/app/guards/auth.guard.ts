import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      const expectedRoles = route.data?.roles;

      if (!expectedRoles || expectedRoles.includes(role)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
