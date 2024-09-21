import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () => import('././components/list/list.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Clientes', description: 'Clientes' }
  },
  {
    path: 'details/:id',
    loadComponent: () => import('././components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Clientes', description: 'Detalhes do cliente' }
  },
  {
    path: 'new',
    loadComponent: () => import('././components/add/add.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Clientes', description: 'Novo cliente' }
  },
] as Routes
