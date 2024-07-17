import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path:'', redirectTo:"/login",pathMatch:"full"},
    { path:'**',  loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)},
];
