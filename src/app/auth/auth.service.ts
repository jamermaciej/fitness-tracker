import { FlowRoutes } from './../enums/flow';
import { UIService } from '../navigation/shared/ui.service';
import { TrainingService } from './../training/trainingService';
import { AuthData } from './models/auth-data.model';
import { Subject, Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as fromRoot from '../store';
import { Store } from '@ngrx/store';
import * as fromUI from '../navigation/shared/store';
import * as fromAuth from '../auth/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './models/user.model';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    user: Observable<firebase.User>;
    private isAuthenticated: boolean;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiService: UIService,
                private store: Store<fromRoot.State>,
                private db: AngularFirestore
            ) {
                this.user = afAuth.authState;
            }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                // this.isAuthenticated = true;
                // this.authChange.next(true);
                this.store.dispatch(new fromAuth.SetAuthenticated());
                this.db.collection('users', ref => ref.where('uid', '==', user.uid)).valueChanges().subscribe(user => {
                    const [ userData ] = user;
                    this.store.dispatch(new fromAuth.SetUser(userData as User));
                });
            } else {
                this.trainingService.cancelSubscription();
                this.afAuth.auth.signOut();
                // this.isAuthenticated = false;
                // this.authChange.next(false);
                this.store.dispatch(new fromAuth.SetUnauthenticated());
                this.store.dispatch(new fromAuth.ClearUser());
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
            const { uid, displayName, email, emailVerified, phoneNumber, photoURL } = result.user;
            const { creationTime, lastSignInTime } = result.user.metadata;
            return this.db.collection('users').doc(result.user.uid).set({
                uid,
                displayName,
                email,
                emailVerified,
                creationTime,
                lastSignInTime,
                phoneNumber,
                photoURL
            });
        }).then(() => {
            this.store.dispatch(new fromUI.StopLoading);
            this.router.navigate([FlowRoutes.TRAINING]);
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
            this.router.navigate([FlowRoutes.TRAINING]);
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
