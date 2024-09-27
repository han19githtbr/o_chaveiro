import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () => import('././components/list/list.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Controle de acesso', description: 'Controle de acesso' }
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('././components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Controle de acesso', description: 'Detalhes do administrador' }
  },
  {
    path: 'novo',
    loadComponent: () => import('././components/details/details.component'),
    data: { useBreadcrumb: true, breadcrumb: 'Controle de acesso', description: 'Adicionar administrador' }
  },
] as Routes;
