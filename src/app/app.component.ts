import { Component } from '@angular/core';
import { Votaciones } from './votaciones/votaciones.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  votaciones: Votaciones[];

  constructor() {
    this.votaciones = [
      new Votaciones('angular', 'http://angular.io', 10),
      new Votaciones('google', 'http://google.com', 100),
      new Votaciones('youtube', 'http://youtube.com', 1000)
    ];
  }

  addVotacion(titulo: HTMLInputElement, enlace: HTMLInputElement): boolean {
    console.log('Titulo: ' + titulo.value);
    this.votaciones.push(new Votaciones(titulo.value, enlace.value));
    titulo.value = '';
    enlace.value = '';
    return false;
  }

  votacionesOrdenadas() {
    return this.votaciones.sort((a: Votaciones, b: Votaciones) => b.votos - a.votos);
  }

}
