import { Routes, RouterModule } from '@angular/router';

import { InicioVotacionesComponent } from './componentes/inicio-votaciones/inicio-votaciones.component';
import { ListaVotacionesComponent } from './componentes/lista-votaciones/lista-votaciones.component';
import { NuevaVotacionComponent } from './componentes/nueva-votacion/nueva-votacion.component';
import { NuevaReclamacionComponent } from './componentes/nueva-reclamacion/nueva-reclamacion.component';
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
    { path: 'reclamacion', component: NuevaReclamacionComponent,
        data: {
            breadcrumb: 'Nueva Reclamación'
        }},
    { path: 'reclamaciones', component: ListaReclamacionesComponent,
        data: {
            breadcrumb: 'Listado Reclamaciones'
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
