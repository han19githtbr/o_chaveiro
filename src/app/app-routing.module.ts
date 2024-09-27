import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import GerencialComponent from './modules/gerencial/gerencial.component';
import HomeComponent from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('../app/modules/home/home.routes'),
    component: HomeComponent
  },
  
  {
    path: 'gerencial',
    loadChildren: () => import('../app/modules/gerencial/gerencial.routes'),
    component: GerencialComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
