import { SharedModule } from './../navigation/shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule {}
