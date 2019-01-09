import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';

@Component({
  selector: 'app-lista-votaciones',
  templateUrl: './lista-votaciones.component.html',
  styleUrls: ['./lista-votaciones.component.css']
})
export class ListaVotacionesComponent implements OnInit {

  votaciones: Votaciones[];

  constructor(private router: Router, private votacionesService: VotacionesService) {
  }

  votacionesOrdenadas() {
    if (this.votaciones !== undefined) {
      return this.votaciones.sort((a: Votaciones, b: Votaciones) => b.numero - a.numero);
    } else {
      return null;
    }
  }

  inicializarVotaciones() {
    this.votacionesService.getVotaciones()
    .subscribe(votaciones => {
      this.votaciones = votaciones;
    });
  }

  ngOnInit() {
    this.inicializarVotaciones();
  }
}
