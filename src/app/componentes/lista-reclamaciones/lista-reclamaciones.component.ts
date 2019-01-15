import { Component, OnInit } from '@angular/core';
import { ReclamacionesService } from 'src/app/servicios/reclamaciones.service';
import { tipo } from '../util/TipoAlertas';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-lista-reclamaciones',
  templateUrl: './lista-reclamaciones.component.html'
})
export class ListaReclamacionesComponent implements OnInit {

  reclamaciones: Reclamacion[];

  constructor(private reclamacionesService: ReclamacionesService, private messageService: MessageService) { }

  getReclamaciones() {
    this.reclamacionesService.getReclamaciones().subscribe(reclamaciones => {
      // this.messageService.add({texto: 'Obtiene las reclamaciones de Postgres', tipo: tipo.log});
      this.reclamaciones = reclamaciones;
    });
  }

  ngOnInit() {
    this.getReclamaciones();
  }

}
