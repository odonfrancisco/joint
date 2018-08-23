import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'signup', component: AuthSignupComponent},
    {path: 'login', component: AuthLoginComponent},
    {path: 'home', component: HomeComponent},
]