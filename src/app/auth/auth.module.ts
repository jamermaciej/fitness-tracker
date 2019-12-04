import { SharedModule } from './../navigation/shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule,
        AuthRoutingModule,
        StoreModule.forFeature('auth', reducers)
    ],
    exports: []
})
export class AuthModule {}
