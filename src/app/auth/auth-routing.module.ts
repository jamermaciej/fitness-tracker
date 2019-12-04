import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
    { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
