import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { ConfigComponent } from './config/config.component';
import { MessagesComponent } from './messages/messages.component';
import { UploaderComponent } from './uploader/uploader.component';
import { AppRoutingModule } from './app-routing.module';
import { VotacionesService} from './votaciones/votaciones.service';
import { HttpClientModule } from "@angular/common/http";
import { NuevaVotacionComponent } from './nueva-votacion/nueva-votacion.component';
import { ListaVotacionesComponent } from './lista-votaciones/lista-votaciones.component';
import { MessageService } from './message.service';

const appRoutes: Routes = [
  { path: 'nueva-votacion', component: NuevaVotacionComponent },
  { path: 'lista-votaciones', component: ListaVotacionesComponent },
  { path: 'detalle-votacion/:id', component: VotacionesComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' }//,
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VotacionesComponent,
    ConfigComponent,
    MessagesComponent,
    UploaderComponent,
    NuevaVotacionComponent,
    ListaVotacionesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VotacionesService, MessageService],
  bootstrap: [AppComponent]
})


export class AppModule { }
