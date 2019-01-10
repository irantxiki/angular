import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';
import { ReclamacionesService } from 'src/app/servicios/reclamaciones.service';
import { tipo } from '../util/TipoAlertas';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-reclamaciones',
  templateUrl: './reclamaciones.component.html'/*,
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }`]*/
})
export class ReclamacionesComponent {
  reclamacion: Reclamacion;
  validado = false;
  porcentaje = null;
  ficheroSeleccionado: File;

  constructor(private reclamacionesService: ReclamacionesService, private messageService: MessageService) {
    this.reclamacion = new Reclamacion();
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
    });

  }

}
