import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';
import { tipo } from '../util/TipoAlertas';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-lista-votaciones',
  templateUrl: './lista-votaciones.component.html',
  styleUrls: ['./lista-votaciones.component.css']
})
export class ListaVotacionesComponent implements OnInit {

  votaciones: Votaciones[];

  constructor(private router: Router, private votacionesService: VotacionesService, private messageService: MessageService) {
    this.messageService.clear();
  }

  votacionesOrdenadas() {
    if (this.votaciones !== undefined) {
      return this.votaciones.sort((a: Votaciones, b: Votaciones) => b.numero - a.numero);
    } else {
      return null;
    }
  }

  inicializarVotaciones() {
    this.votacionesService.getVotaciones().subscribe(votaciones => {
      this.messageService.add({texto: 'Obtiene las votaciones de Postgres', tipo: tipo.log});
      this.votaciones = votaciones;
    });
  }

  ngOnInit() {
    this.inicializarVotaciones();
  }
}
