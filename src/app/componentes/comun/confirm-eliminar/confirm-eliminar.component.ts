import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { VotacionesService } from '../../../servicios/votaciones.service';

@Component({
  selector: 'app-confirm-eliminar',
  templateUrl: './confirm-eliminar.component.html'
})
export class ConfirmEliminarComponent implements OnInit {
  @Input() mensaje = 'default label';
  @Input() votacion;
  closeResult: string;

  constructor(public activeModal: NgbActiveModal,
              private votacionesService: VotacionesService,
              ) { }

  ngOnInit() {
  }

  onOkEliminar() {

    this.votacionesService.eliminarVotacion(this.votacion)
      .subscribe( data => {

      const element = document.getElementById(this.votacion.id);
      element.parentNode.removeChild(element);
    });

    this.activeModal.dismiss('Accept clicked');
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
