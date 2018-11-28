import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Votaciones } from '../votaciones/votaciones.model';
import { VotacionesService } from '../votaciones/votaciones.service';

@Component({
  selector: 'app-lista-votaciones',
  templateUrl: './lista-votaciones.component.html',
  styleUrls: ['./lista-votaciones.component.css']
})
export class ListaVotacionesComponent implements OnInit {
  
  votaciones: Votaciones[];

  constructor(private router: Router, private votacionesService: VotacionesService) {
    this.votaciones = [
      new Votaciones(1, 'angular', 'http://angular.io', 10),
      new Votaciones(2, 'google', 'http://google.com', 100),
      new Votaciones(3, 'youtube', 'http://youtube.com', 1000)
    ];
  }

  votacionesOrdenadas() {
    return this.votaciones.sort((a: Votaciones, b: Votaciones) => b.votos - a.votos);
  }

  ngOnInit() {
    /*this.votacionesService.getVotaciones().subscribe(
    data => this.votaciones = data 
    );*/
  }
}
