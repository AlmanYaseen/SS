import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private localStorage: LocalStorageService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['./login']);
      return false;
    }
    else if (route.data.hasRole && route.data.hasRole !== this.localStorage.get("Obj").role) {
      this.router.navigate(['./accessdenied']);
      return false;
    }
    return true;
  }
}
