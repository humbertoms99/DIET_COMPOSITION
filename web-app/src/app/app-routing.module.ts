import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TopnavComponent } from './shared/topnav/topnav.component';

const routes: Routes = [
  {
    path: 'menu',
    component: TopnavComponent
  },
  {
    path: 'ventanas',
    loadChildren: () => import('./ventanas/ventanas.module').then(m => m.VentanasModule)
  },
  {
    path: '**',
    redirectTo: 'ventanas',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
