import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-eliminar',
  templateUrl: './confirm-eliminar.component.html'
})
export class ConfirmEliminarComponent implements OnInit {
  @Input() mensaje = 'default label';
  @Input() accion: Function;
  
  constructor(public activeModal: NgbActiveModal) {
  }
  
  ngOnInit() {
  }

}
