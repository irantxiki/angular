import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// Votaciones Class
import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';
import { MessageService } from '../../servicios/message.service';
import { ConfirmEliminarComponent } from '../comun/confirm-eliminar/confirm-eliminar.component';
import { tipo } from '../util/TipoAlertas';


@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() votacionInput: Votaciones;

  votaciones: Votaciones[];

  @Output() recargarListado: EventEmitter<number>;
  modalEliminarVotacion: NgbModalRef;

  constructor( private route: ActivatedRoute, private router: Router,
              private votacionesService: VotacionesService, private messageService: MessageService,
              private modalService: NgbModal
              ) {
                messageService.clear();
                this.recargarListado = new EventEmitter();
  }

  openEliminarModal(id: any) {

    this.modalEliminarVotacion = this.modalService.open(ConfirmEliminarComponent);
    this.modalEliminarVotacion.componentInstance.mensaje = 'VOTACIONES.CONFIRM_ELIMINAR';
    this.modalEliminarVotacion.componentInstance.accion = () => this.onOkEliminarVotacion();

  }

  onOkEliminarVotacion() {
      this.votacionesService.eliminarVotacion(this.votacionInput)
        .subscribe(data  => {
          this.recargarListado.emit ();
          this.messageService.add({texto: 'Eliminado correctamente', tipo: tipo.log});
      },
      err => {});
  }

  voto(numero: number) {
    this.votacionInput.numero = numero;
    this.votacionInput.animacion = true;
    this.votacionesService.actualizarVotacion(this.votacionInput).subscribe(_ => {
    this.votacionInput.animacion = false;
    });
  }

  ngOnInit() {
    /*
    this.votaciones$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.votacionesService.getVotacion(params.get('id')).subscribe(
          (data : Votaciones)=> { this.votaciones = data }
          );
    );*/
  }
}
