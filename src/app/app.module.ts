import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

// internacionalización
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ReclamacionesComponent } from './componentes/reclamaciones/reclamaciones.component';

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
    SidebarComponent,
    ReclamacionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [VotacionesService, MessageService],
  bootstrap: [AppComponent]
})


export class AppModule { }
