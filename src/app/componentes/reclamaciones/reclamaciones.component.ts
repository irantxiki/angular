import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';
import { ReclamacionesService } from 'src/app/servicios/reclamaciones.service';
import { UploaderComponent } from '../util/uploader/uploader.component';
import { VotacionesService } from 'src/app/servicios/votaciones.service';
import { Votaciones } from 'src/app/modelo/votaciones.model';

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

  constructor(private reclamacionesService: ReclamacionesService) {
    this.reclamacion = new Reclamacion();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
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
     console.log(data);
    });

    //this.selectedFiles = undefined;
  }

  guardar(formulario: NgForm) {
    this.validado = !this.validado;
    this.upload();
    console.log(formulario);
  }

}
