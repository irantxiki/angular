import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';
import { ReclamacionesService } from 'src/app/servicios/reclamaciones.service';
import { ElasticsearchService } from 'src/app/servicios/elasticsearch.service';
import { MessageService } from 'src/app/servicios/message.service';

import { tipo } from '../util/TipoAlertas';

@Component({
  selector: 'app-reclamaciones',
  templateUrl: './reclamaciones.component.html'/*,
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }`]*/
})
export class ReclamacionesComponent {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  reclamacion: Reclamacion;
  validado = false;
  porcentaje: number = null;

  constructor(private reclamacionesService: ReclamacionesService,
              private messageService: MessageService,
              private es: ElasticsearchService) {
    this.reclamacion = new Reclamacion();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  guardar(formulario: NgForm) {
    this.validado = !this.validado;
    this.upload();
  }

  upload() {
    this.progress.percentage = 0;


    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = null;
    }

    this.reclamacionesService.crearReclamacion(this.reclamacion, this.currentFileUpload)
    .subscribe( data => {
      if (data) {
        this.porcentaje = data;
        this.guardarEnElasticSearch();
      }
    });
  }

  /**
   * Guardamos en Elasticsearch
   */
  guardarEnElasticSearch(): void {
    this.es.addReclamacionToIndex(this.reclamacion).then((result) => {
      this.messageService.add({texto: 'ELASTIC.ADD_OK', tipo: tipo.log});
    }, error => {
      this.messageService.add({texto: 'ELASTIC.ERROR', tipo: tipo.log});
    });
  }

}
