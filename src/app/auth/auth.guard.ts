import { FlowRoutes } from './../enums/flow';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, CanLoad, Route } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { take, map, tap, catchError, filter } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth,
            ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        switch (state.url) {
          case FlowRoutes.LOGIN:
          case FlowRoutes.SIGNUP:
            if ( user ) {
              this.router.navigate([FlowRoutes.TRAINING]);
            }
            return !user;
            break;
          default:
            if ( !user ) {
              this.router.navigate([FlowRoutes.LOGIN]);
            }
            return !!user;
        }
      })
    );
  }

  canLoad(router: Route): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
