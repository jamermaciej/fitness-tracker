import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './../material.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AngularFireAuthModule
    ],
    exports: []
})
export class AuthModule {}
