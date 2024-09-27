import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () => import('./components/list/list.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Pedidos', description: 'Pedidos' }
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Pedidos', description: 'Detalhes do pedido' }
  },
] as Routes
