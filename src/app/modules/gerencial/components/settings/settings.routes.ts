import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () => import('././components/list/list.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Configurações', description: 'Configurações' }
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('././components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Configurações', description: 'Detalhes do colaborador' }
  },
  {
    path: 'novo',
    loadComponent: () => import('././components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Configurações', description: 'Adicionar colaborador' }
  },
] as Routes;
