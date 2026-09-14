import { Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {DishesComponent} from './features/dishes/dishes.component';
import {authGuard} from './core/auth.guard';
import {loggedGuard} from './core/logged.guard';
import {DishDetailComponent} from './features/dishes/dish-detail/dish-detail.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [loggedGuard]},
  {path: 'dishes', component: DishesComponent, canActivate :[authGuard]},
  { path: 'dishes/:name', component: DishDetailComponent, canActivate: [authGuard] },
  {path: '', redirectTo: 'dishes', pathMatch: 'full'},
];
