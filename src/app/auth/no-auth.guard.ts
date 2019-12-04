import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        return this.authService.isAuth().pipe(
            take(1),
            // map(isAuth => !isAuth));
            map(isAuth => {
                if (isAuth) {
                    this.router.navigate(['/training']);
                    return false;
                }
                return true;
            })
        );
    }
}
