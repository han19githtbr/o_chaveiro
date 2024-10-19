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
    loadChildren: () => import('./components/servicos/servicos.routes'),
    data: { useBreadcrumb: true },
  },
  {
    path: 'chaveiros',
    loadChildren: () => import('./components/chaveiros/chaveiros.routes'),
    data: { useBreadcrumb: true },
  },
  {
    path: 'clientes',
    loadChildren: () => import('./components/clientes/clientes.routes'),
    data: { useBreadcrumb: true },
  },
  {
    path: 'notifications',
    loadChildren: () => import('./components/pedidos/pedido.routes'),
    data: { useBreadcrumb: true },
  },
  {
    path: 'admin-chaveiros',
    loadComponent: () => import('./components/chaveiros-admin/chaveiros-admin.component'),
    data: { useBreadcrumb: true },
  },
  /*{
    path: 'admin-modal',
    loadComponent: () => import('./components/admin-modal/admin-modal.component'),
    data: { useBreadcrumb: true },
  },*/
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.routes'),
    data: { useBreadcrumb: true },
  },

] as Route[];
