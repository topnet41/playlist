import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/components/layouts/default-layout/default-layout.component';
import { HomeComponent } from './views/home/home.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

const adminRoutes: Routes = [
  { 
    path: 'music',
    canActivate:[],
    loadChildren: ()=>import('./views/home/home.module').then(m => m.HomeModule),
    data:{ title: 'Home' } 
  }
]

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'music', 
    pathMatch: 'full' ,
  },
  {
    path: 'sessions/404',
    component: NotfoundComponent,
    data:{ title: '404 Notfound' } 
  },
  {
    path: '', 
    component: DefaultLayoutComponent,
    canActivate: [],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'sessions/404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling:'enabled',
    scrollPositionRestoration:'top'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
