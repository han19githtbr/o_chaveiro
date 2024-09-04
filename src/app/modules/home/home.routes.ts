import { Route } from '@angular/router';


export default [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./signin/signin.component'),
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgot-password/forgot-password.component'),
  },
  {
    path: 'reset',
    loadComponent: () => import('./reset-password/reset-password.component'),
  },
  

] as Route[];
