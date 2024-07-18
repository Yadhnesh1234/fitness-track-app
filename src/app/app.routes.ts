import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SaveuserworkoutComponent } from './components/saveuserworkout/saveuserworkout.component';
import { authGuard } from './auth.guard';
import { UserTableComponent } from './components/user-table/user-table.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'getalluser',component:UserTableComponent,canActivate:[authGuard]},
    { path: 'saveworkout',component:SaveuserworkoutComponent,canActivate:[authGuard]},
    { path:'', redirectTo:"/login",pathMatch:"full"},
    { path:'**',  loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)},
];
