import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

// Votaciones Class
import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';
import { MessageService } from '../../servicios/message.service';
import { ConfirmEliminarComponent } from '../comun/confirm-eliminar/confirm-eliminar.component';


@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() votacionInput: Votaciones;

  votaciones: Votaciones[];

  modalReference: NgbModalRef;

  constructor( private route: ActivatedRoute, private router: Router,
              private votacionesService: VotacionesService, private messageService: MessageService,
              private modalService: NgbModal
              ) {

  }

  openEliminarModal(id: any) {
    alert('RR-->' + id);
    const modalRef = this.modalService.open(ConfirmEliminarComponent);
    modalRef.componentInstance.mensaje = '¿Está seguro de eliminar la votación?';
    modalRef.componentInstance.idVotacion = this.votacionInput.id;

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  votoPositivo() {
    this.votacionInput.votoPositivo();
  }

  votoNegativo() {
    this.votacionInput.votoNegativo();
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
