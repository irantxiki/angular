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
    // this.votaciones = [
    // new Votaciones('angular', 'http://angular.io', 10, 1),
    // new Votaciones('google', 'http://google.com', 100, 2),
    // new Votaciones('youtube', 'http://youtube.com', 1000, 3)
    // ];
    this.messageService.clear();
  }

  votacionesOrdenadas() {
    if (this.votaciones !== undefined) {
      return this.votaciones.sort((a: Votaciones, b: Votaciones) => b.numero - a.numero);
    } else {
      return null;
    }
  }

  ngOnInit() {
    /*this.votacionesService.getVotaciones().subscribe(
    data => this.votaciones = data
    );*/
    this.votacionesService.getVotaciones()
    .subscribe(votaciones => {
      this.messageService.add({texto: 'pasa por aqui', tipo: tipo.log});
      this.votaciones = votaciones;
    });
  }
}
