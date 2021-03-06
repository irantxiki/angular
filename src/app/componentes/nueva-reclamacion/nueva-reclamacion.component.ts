import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';
import { ReclamacionesService } from 'src/app/servicios/reclamaciones.service';

import { ElasticsearchService } from 'src/app/servicios/elasticsearch.service';
import { UploaderComponent } from '../util/uploader/uploader.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { tipo } from '../util/TipoAlertas';
import { MessageService } from 'src/app/servicios/message.service';


@Component({
  selector: 'app-nueva-reclamacion',
  templateUrl: './nueva-reclamacion.component.html'/*,
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }`]*/
})
export class NuevaReclamacionComponent {
  reclamacion: Reclamacion;
  validado = false;
  porcentaje = null;
  ficheroSeleccionado: File;

  constructor(private reclamacionesService: ReclamacionesService,
              private messageService: MessageService,
              private es: ElasticsearchService) {
    this.reclamacion = new Reclamacion();
    messageService.clear();
  }

  seleccionarFichero(fichero: File) {
    this.ficheroSeleccionado = fichero;
  }

  guardar(formulario: NgForm) {
    this.validado = !this.validado;
    this.upload();
  }

  upload() {
    this.reclamacionesService.crearReclamacion(this.reclamacion, this.ficheroSeleccionado)
    .subscribe( data => {
      if (data instanceof Object) {
        this.reclamacion = data;
      } else {
        this.porcentaje = data;
      }
    },
    _ => {},
    () => {
      this.messageService.add({texto: 'RECLAMACIONES.RECLAMACION_CREADA', tipo: tipo.success});
      this.porcentaje = 0;
      this.guardarEnElasticSearch();
    });

  }

  /**
   * Guardamos en Elasticsearch, pero sin el fichero adjunto
   */
  guardarEnElasticSearch(): void {
    this.es.addReclamacionToIndex(this.reclamacion).then((result) => {
      this.messageService.add({texto: 'ELASTIC.ADD_OK', tipo: tipo.log});
    }, error => {
      this.messageService.add({texto: 'ELASTIC.ERROR', tipo: tipo.log});
    });
  }

}
