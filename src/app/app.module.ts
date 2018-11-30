import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { MessagesComponent } from './messages/messages.component';
import { UploaderComponent } from './uploader/uploader.component';
import { routing } from './app-routing.module';
import { VotacionesService} from './votaciones/votaciones.service';
import { HttpClientModule } from "@angular/common/http";
import { InicioVotacionesComponent } from './inicio-votaciones.component';
import { NuevaVotacionComponent } from './nueva-votacion/nueva-votacion.component';
import { ListaVotacionesComponent } from './lista-votaciones/lista-votaciones.component';
import { MessageService } from './message.service';
import { SidebarComponent } from './sidebar/sidebar.component';

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
