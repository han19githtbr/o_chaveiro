import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
  {
    path: 'chaveiro',
    loadComponent: () => import('./components/chaveiros/chaveiros.component'),
    data: { breadcrumb: 'Chaveiros', description: 'Chaveiros' }
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./components/pedidos/pedidos.component'),
    data: { breadcrumb: 'Pedidos', description: 'Pedidos' }
  },

] as Route[];
