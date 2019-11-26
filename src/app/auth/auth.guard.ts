import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, CanLoad, Route } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth,
            ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  canLoad(router: Route): boolean {
    if (this.authService.user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
