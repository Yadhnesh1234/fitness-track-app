import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SaveuserworkoutComponent } from './components/saveuserworkout/saveuserworkout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'saveworkout',component:SaveuserworkoutComponent},
    { path:'', redirectTo:"/login",pathMatch:"full"},
    { path:'**',  loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)},
];
