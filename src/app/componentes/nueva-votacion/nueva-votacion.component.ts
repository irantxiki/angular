import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';
import { ElasticsearchService } from 'src/app/servicios/elasticsearch.service';


@Component({
  selector: 'app-nueva-votacion',
  templateUrl: './nueva-votacion.component.html',
  styleUrls: ['./nueva-votacion.component.css']
})
export class NuevaVotacionComponent implements OnInit, OnDestroy {

  loading: boolean;
  nuevaVotacionForm: FormGroup;
  submitted = false;
  idEdit: any;
  tituloVentana: string;
  votacion;
  private sub: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute,
              private votacionesService: VotacionesService,
              private es: ElasticsearchService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.idEdit = params['id'];
      console.log('RR 1');
      console.log(this.idEdit);
      console.log('RR 2');
    });

    if (this.idEdit) {
      this.tituloVentana = 'VOTACIONES.EDIT_VOTACION';

      this.votacionesService.getVotacion(this.idEdit)
        .subscribe(votacion => {
          this.votacion = votacion;
          console.log('Votacion Recuperada ' + this.votacion.titulo);
        });

      this.nuevaVotacionForm = this.formBuilder.group({
        titulo: ['', [
          Validators.required,
          Validators.minLength(4)
        ]],
        enlace: ['']
      });
    } else {
      this.tituloVentana = 'VOTACIONES.ADD_VOTACION';
      this.nuevaVotacionForm = this.formBuilder.group({
        titulo: ['', [
          Validators.required,
          Validators.minLength(4)// ,
          // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        ]],
        enlace: ['']
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.nuevaVotacionForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.nuevaVotacionForm.invalid) {
      return;
    } else {
      this.addVotacion(this.nuevaVotacionForm.controls['titulo'].value,
      this.nuevaVotacionForm.controls['enlace'].value);
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

          this.guardarEnElasticSearch();
        });
  }

  /**
   * Guardamos en Elasticsearch
   */
  guardarEnElasticSearch(): void {
    this.es.addToIndex({
      index: 'gkz_index',
      type: 'votacion',
      id: this.votacion.id,
      body: {
        titulo: this.votacion.titulo,
        enlace: this.votacion.enlace,
        numero: this.votacion.numero,
        published: new Date().toLocaleString()
      }
    }).then((result) => {
      console.log(result);
      alert('Document added, see log for more info');
    }, error => {
      alert('Something went wrong, see log for more info');
      console.error(error);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
