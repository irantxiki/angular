import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';
import { ElasticsearchService } from 'src/app/servicios/elasticsearch.service';
import { MessageService } from 'src/app/servicios/message.service';

import { tipo } from '../util/TipoAlertas';


@Component({
  selector: 'app-nueva-votacion',
  templateUrl: './nueva-votacion.component.html',
  styleUrls: []
})
export class NuevaVotacionComponent implements OnInit, OnDestroy {

  loading: boolean;
  nuevaVotacionForm: FormGroup;
  submitted = false;
  idEdit: any;
  tituloVentana: string;
  votacion: any;
  private sub: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private votacionesService: VotacionesService,
              private messageService: MessageService,
              private es: ElasticsearchService) {
    messageService.clear();
  }

  ngOnInit(): void {

    this.nuevaVotacionForm = this.formBuilder.group({
      titulo: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      enlace: ['']
    });

    this.sub = this.route.params.subscribe(params => {

      if (params.record) {
        this.votacion = JSON.parse(params.record) as Votaciones;
        this.nuevaVotacionForm.patchValue(this.votacion);
      }
    });

    if (this.votacion) {
      this.tituloVentana = 'VOTACIONES.EDIT_VOTACION';
      document.getElementById('btnVolver').style.display = 'block';
    } else {
      this.tituloVentana = 'VOTACIONES.ADD_VOTACION';
      document.getElementById('btnVolver').style.display = 'none';
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.nuevaVotacionForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.messageService.clear();

    // stop here if form is invalid
    if (this.nuevaVotacionForm.invalid) {
      return;
    } else {
      if (this.votacion) {
        this.updateVotacion();
      } else {
        this.addVotacion(this.nuevaVotacionForm.controls['titulo'].value,
        this.nuevaVotacionForm.controls['enlace'].value);
      }
    }
  }

  addVotacion(titulo: string, enlace: string): boolean {
    this.votacion = new Votaciones(titulo, enlace);
    this.saveVotacion();
    return false;
  }

  /**
   * Guardamos en Postgre y en ElasticSearch
   * @param votacion
   */
  saveVotacion(): void {
    this.loading = true;

    this.votacionesService.crearVotacion(this.votacion)
        .subscribe( data => {
          this.votacion = data;
          this.loading = false;

          this.messageService.add({texto: 'VOTACIONES.ALTA', tipo: tipo.success});
          this.messageService.add({texto: 'POSTGRES.ADD_OK', tipo: tipo.log});
          this.guardarEnElasticSearch();
        },
        err => this.loading = false);
  }

   /**
   * Guardamos en Postgre y en ElasticSearch
   * @param votacion
   */
  updateVotacion(): void {
    this.loading = true;

    this.votacion.titulo = this.nuevaVotacionForm.controls['titulo'].value;
    this.votacion.enlace = this.nuevaVotacionForm.controls['enlace'].value;

    this.votacionesService.actualizarVotacion(this.votacion)
        .subscribe( _ => {
          this.loading = false;

          this.messageService.add({texto: 'VOTACIONES.UPDATE', tipo: tipo.success});
          this.messageService.add({texto: 'POSTGRES.UPDATE_OK', tipo: tipo.log});
          this.updateEnElasticSearch();
        });
  }

  volverListado(): void {
    this.router.navigate(['../lista-votaciones'], { relativeTo: this.route });
  }

  /**
   * Guardamos en Elasticsearch
   */
  guardarEnElasticSearch(): void {
    this.es.addVotacionToIndex(this.votacion).then((result) => {
      this.messageService.add({texto: 'ELASTIC.ADD_OK', tipo: tipo.log});
    }, error => {
      this.messageService.add({texto: 'ELASTIC.ERROR', tipo: tipo.log});
    });
  }

    /**
   * Guardamos en Elasticsearch
   */
  updateEnElasticSearch(): void {
    this.es.updateVotacion(this.votacion).then((result) => {
      this.messageService.add({texto: 'ELASTIC.ADD_OK', tipo: tipo.log});
    }, error => {
      this.messageService.add({texto: 'ELASTIC.ERROR', tipo: tipo.log});
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
