import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InicioVotacionesComponent } from './inicio-votaciones.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { ListaVotacionesComponent } from './lista-votaciones/lista-votaciones.component';
import { NuevaVotacionComponent } from './nueva-votacion/nueva-votacion.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/votaciones', pathMatch: 'full' },
  { path: 'votaciones', component: InicioVotacionesComponent ,
    children: [
    { path: 'nueva-votacion', component: NuevaVotacionComponent },
    { path: 'lista-votaciones', component: ListaVotacionesComponent },
    { path: 'detalle-votacion/:id', component: VotacionesComponent }
    ]}
  //{ path: '**', component: PageNotFoundComponent }
];


export const routing = RouterModule.forRoot(appRoutes);
export class AppRoutingModule { }
