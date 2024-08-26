import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component'),
    data: { breadcrumb: 'Dashboard', description: 'Dashboard' },
  },
  {
    path: 'keys',
    loadChildren: () => import('./components/chaveiros/chaveiros.routes'),
    data: { useBreadcrumb: true },
  },
  {
    path: 'servicos',
    loadChildren: () => import('./components/servicos/servicos.component'),
    data: { useBreadcrumb: true },
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.routes'),
    data: { useBreadcrumb: true },
  },

] as Route[];
