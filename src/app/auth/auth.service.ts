import { UIService } from '../navigation/shared/ui.service';
import { TrainingService } from './../training/trainingService';
import { AuthData } from './models/auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as fromRoot from '../store';
import { Store } from '@ngrx/store';
import * as fromUI from '../navigation/shared/store';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    user: Observable<firebase.User>;
    private isAuthenticated: boolean;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService,
                private store: Store<fromRoot.State>
            ) {
                this.user = afAuth.authState;
            }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
            } else {
                this.trainingService.cancelSubscription();
                this.afAuth.auth.signOut();
                this.isAuthenticated = false;
                this.authChange.next(false);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new fromUI.StartLoading);
        // this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.store.dispatch(new fromUI.StopLoading);
            // this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.store.dispatch(new fromUI.StopLoading);
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error, null, 3000);
        });
    }

    login(authData: AuthData) {
        this.store.dispatch(new fromUI.StartLoading);
        // this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.store.dispatch(new fromUI.StopLoading);
            // this.uiService.loadingStateChanged.next(false);
            localStorage.setItem('isLogged', 'true');
            this.router.navigate(['/training']);
        })
        .catch(error => {
            this.store.dispatch(new fromUI.StopLoading);
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('isLogged');
            this.router.navigate(['/login']);
        });
    }

    isAuth(): Observable<boolean> {
        return this.user.pipe(
            map(user => user && user.uid !== undefined));
    }
}
