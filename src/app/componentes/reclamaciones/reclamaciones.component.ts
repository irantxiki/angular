import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';

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

  constructor() {
    this.reclamacion = new Reclamacion('Rafael', '999999999', 'adsf@gladj.com', 'cosas random');
  }

  guardar(formulario: NgForm) {
    this.validado = !this.validado;
    console.log(formulario);
  }

}
