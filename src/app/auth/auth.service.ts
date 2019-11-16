import { TrainingService } from './../training/trainingService';
import { User } from './models/user.model';
import { AuthData } from './models/auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService
            ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
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
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .catch(error => console.log(error));
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
        .catch(error => console.log(error));
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
