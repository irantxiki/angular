import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VotacionesComponent } from './componentes/votaciones/votaciones.component';
import { MessagesComponent } from './componentes/messages/messages.component';
import { UploaderComponent } from './componentes/uploader/uploader.component';
import { routing } from './app-routing.module';
import { VotacionesService} from './servicios/votaciones.service';
import { HttpClientModule } from '@angular/common/http';
import { InicioVotacionesComponent } from './componentes/inicio-votaciones/inicio-votaciones.component';
import { NuevaVotacionComponent } from './componentes/nueva-votacion/nueva-votacion.component';
import { ListaVotacionesComponent } from './componentes/lista-votaciones/lista-votaciones.component';
import { MessageService } from './servicios/message.service';
import { SidebarComponent } from './componentes/comun/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    UploaderComponent,
    InicioVotacionesComponent,
    VotacionesComponent,
    NuevaVotacionComponent,
    ListaVotacionesComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [VotacionesService, MessageService],
  bootstrap: [AppComponent]
})


export class AppModule { }
