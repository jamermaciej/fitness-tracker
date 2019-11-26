import { UIService } from '../navigation/shared/ui.service';
import { TrainingService } from './../training/trainingService';
import { AuthData } from './models/auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    user: Observable<firebase.User>;
    private isAuthenticated: boolean;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService
            ) {
                this.user = afAuth.authState;
            }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training/new-exercise']);
            } else {
                this.trainingService.cancelSubscription();
                this.afAuth.auth.signOut();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error, null, 3000);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            localStorage.setItem('isLogged', 'true');
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error, null, 3000);
        });
    }

    logout() {
        localStorage.removeItem('isLogged');
        this.afAuth.auth.signOut();
    }

    isAuth(): Observable<boolean> {
        return this.user.pipe(
            map(user => user && user.uid !== undefined));
    }
}
