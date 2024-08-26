import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () => import('././components/list/list.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Chaveiros', description: 'Usuários' }
  },
  {
    path: 'details/:id',
    loadComponent: () => import('././components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Chaveiros', description: 'Detalhes do usuário' }
  },
  {
    path: 'new',
    loadComponent: () => import('././components/add/add.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Chaveiros', description: 'Novo usuário' }
  },
] as Routes
