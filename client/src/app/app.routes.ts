import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { HomeComponent } from './home/home.component';
import { AppOrderComponent } from './customer/app-order/app-order.component';
import { RestaurantMainComponent } from './restaurant/restaurant-main/restaurant-main.component';
import { AuthLogoutComponent } from './auth/auth-logout/auth-logout.component';
import { RestaurantAuthGuardService } from './guards/restaurant-auth-guard.service';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'signup', component: AuthSignupComponent},
    {path: 'login', component: AuthLoginComponent},
    {path: 'logout', component: AuthLogoutComponent},
    {path: 'home', component: HomeComponent},
    {path: 'restaurant',
        children: [
            {path: '', component: RestaurantMainComponent},
            {path: 'auth', component: RestaurantMainComponent },
            {path: ':role/:id', 
                component: RestaurantMainComponent,
                canActivate: [RestaurantAuthGuardService],
            },
            {path: ':id', component: AppOrderComponent }
        ]}
]