import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () => import('./components/list/list.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Serviços', description: 'Serviços' }
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Serviços', description: 'Detalhes do serviço' }
  },
  {
    path: 'new',
    loadComponent: () => import('./components/add/add.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Serviços', description: 'Novo serviço' }
  },
] as Routes
