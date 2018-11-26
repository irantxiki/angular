import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { AppRoutingModule } from './app-routing.module';
import { VotacionesService} from './votaciones/votaciones.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    VotacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [VotacionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
