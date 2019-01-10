import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VotacionesComponent } from './componentes/votaciones/votaciones.component';
import { MessagesComponent } from './componentes/util/messages/messages.component';
import { UploaderComponent } from './componentes/util/uploader/uploader.component';
import { routing } from './app-routing.module';
import { VotacionesService} from './servicios/votaciones.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InicioVotacionesComponent } from './componentes/inicio-votaciones/inicio-votaciones.component';
import { NuevaVotacionComponent } from './componentes/nueva-votacion/nueva-votacion.component';
import { ListaVotacionesComponent } from './componentes/lista-votaciones/lista-votaciones.component';
import { MessageService } from './servicios/message.service';
import { SidebarComponent } from './componentes/comun/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/comun/navbar/navbar.component';
import { ConfirmEliminarComponent } from './componentes/comun/confirm-eliminar/confirm-eliminar.component';

import { SearchVotacionesComponent } from './componentes/search-votaciones/search-votaciones.component';

// internacionalización
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ReclamacionesComponent } from './componentes/reclamaciones/reclamaciones.component';

// migas
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
import { ReclamacionesService } from './servicios/reclamaciones.service';

import { TipoAlertas } from './componentes/util/TipoAlertas';
import { SearchReclamacionesComponent } from './componentes/search-reclamaciones/search-reclamaciones.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    UploaderComponent,
    InicioVotacionesComponent,
    VotacionesComponent,
    NuevaVotacionComponent,
    ListaVotacionesComponent,
    SearchVotacionesComponent,
    SidebarComponent,
    ReclamacionesComponent,
    SearchReclamacionesComponent,
    NavbarComponent,
    ConfirmEliminarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule.forRoot(),
    routing,
    BreadcrumbsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [VotacionesService, ReclamacionesService, MessageService, TipoAlertas],
  entryComponents: [ConfirmEliminarComponent],
  bootstrap: [AppComponent]
})

export class AppModule {

}
