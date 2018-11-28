import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotacionesComponent } from './votaciones/votaciones.component';

const routes: Routes = [
  {
    path: '',
    component: VotacionesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
