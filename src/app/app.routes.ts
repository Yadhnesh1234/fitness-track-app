import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SaveuserworkoutComponent } from './components/saveuserworkout/saveuserworkout.component';
import { authGuard } from './auth.guard';
import { UserslistComponent } from './components/userslist/userslist.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'saveworkout',component:SaveuserworkoutComponent,canActivate:[authGuard]},
    { path: 'userlist',component:UserslistComponent,canActivate:[authGuard]},
    { path: 'profile/:id',component:ProfileComponent,canActivate:[authGuard]},
    { path:'', redirectTo:"/login",pathMatch:"full"},
    { path:'**',  loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)},
];
