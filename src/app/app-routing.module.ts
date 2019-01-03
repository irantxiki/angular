import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InicioVotacionesComponent } from './componentes/inicio-votaciones/inicio-votaciones.component';
import { VotacionesComponent } from './componentes/votaciones/votaciones.component';
import { ListaVotacionesComponent } from './componentes/lista-votaciones/lista-votaciones.component';
import { NuevaVotacionComponent } from './componentes/nueva-votacion/nueva-votacion.component';
import { SearchVotacionesComponent } from './componentes/search-votaciones/search-votaciones.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/votaciones', pathMatch: 'full' },
  { path: 'votaciones', component: InicioVotacionesComponent ,
    data: {
        breadcrumb: 'Inicio'
    },
    children: [
    { path: 'nueva-votacion', component: NuevaVotacionComponent,
    data: {
        breadcrumb: 'Nueva Votación'
    }},
    { path: 'lista-votaciones', component: ListaVotacionesComponent,
    data: {
        breadcrumb: 'Listado Votaciones'
    }},
    { path: 'search-votaciones', component: SearchVotacionesComponent,
    data: {
        breadcrumb: 'Search Votaciones'
    }},
    { path: 'detalle-votacion/:id', component: VotacionesComponent,
    data: {
        breadcrumb: 'Detalle Votación'
    }}
    ]}
  // { path: '**', component: PageNotFoundComponent }
];


export const routing = RouterModule.forRoot(APP_ROUTES, { useHash : true });
export class AppRoutingModule { }
