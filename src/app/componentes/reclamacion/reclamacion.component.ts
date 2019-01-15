import { Component, OnInit, Input } from '@angular/core';
import { Reclamacion } from 'src/app/modelo/reclamacion.model';

@Component({
  selector: 'app-reclamacion',
  templateUrl: './reclamacion.component.html',
  styleUrls: ['./reclamacion.component.css']
})
export class ReclamacionComponent {

  @Input() reclamacion: Reclamacion;

  constructor() { }

}
