import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor( private route: ActivatedRoute, private router: Router,
              private votacionesService: VotacionesService, private messageService: MessageService,
              private modalService: NgbModal
              ) {

  }

  openEliminarModal(id: string) {
    const modalRef = this.modalService.open(ConfirmEliminarComponent);
    modalRef.componentInstance.mensaje = '¿Está seguro de eliminar la votación?';
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
