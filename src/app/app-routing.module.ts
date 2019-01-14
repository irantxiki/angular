import { Routes, RouterModule } from '@angular/router';

import { InicioVotacionesComponent } from './componentes/inicio-votaciones/inicio-votaciones.component';
import { VotacionesComponent } from './componentes/votaciones/votaciones.component';
import { ListaVotacionesComponent } from './componentes/lista-votaciones/lista-votaciones.component';
import { NuevaVotacionComponent } from './componentes/nueva-votacion/nueva-votacion.component';
import { ReclamacionesComponent } from './componentes/reclamaciones/reclamaciones.component';
import { SearchVotacionesComponent } from './componentes/search-votaciones/search-votaciones.component';
import { SearchReclamacionesComponent } from './componentes/search-reclamaciones/search-reclamaciones.component';
import { ListaReclamacionesComponent } from './componentes/lista-reclamaciones/lista-reclamaciones.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/votaciones', pathMatch: 'full' },
  { path: 'votaciones', component: InicioVotacionesComponent ,
    data: {
        breadcrumb: 'Inicio'
    },
    children: [
    { path: 'reclamacion', component: ReclamacionesComponent,
        data: {
            breadcrumb: 'Reclamaciones'
        }},
    { path: 'reclamaciones', component: ListaReclamacionesComponent,
        data: {
            breadcrumb: 'Reclamaciones'
        }},
    { path: 'search-reclamaciones', component: SearchReclamacionesComponent,
        data: {
            breadcrumb: 'Search Reclamaciones'
        }},
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
    { path: 'detalle-votacion', component: NuevaVotacionComponent,
    data: {
        breadcrumb: 'Detalle Votación'
    }}
    ]}
  // { path: '**', component: PageNotFoundComponent }
];


export const routing = RouterModule.forRoot(APP_ROUTES, { useHash : true });
export class AppRoutingModule { }
