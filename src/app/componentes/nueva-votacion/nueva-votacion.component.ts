import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Votaciones } from '../../modelo/votaciones.model';
import { VotacionesService } from '../../servicios/votaciones.service';


@Component({
  selector: 'app-nueva-votacion',
  templateUrl: './nueva-votacion.component.html',
  styleUrls: ['./nueva-votacion.component.css']
})
export class NuevaVotacionComponent implements OnInit {

  loading: boolean;
  nuevaVotacionForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, 
              private votacionesService: VotacionesService) { }

  ngOnInit(): void {
    this.nuevaVotacionForm = this.formBuilder.group({
      titulo: ['', [
        Validators.required,
        Validators.minLength(4)//,
        //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]],
      enlace: ['']
    });
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
    //console.log('Titulo: ' + titulo);
    //console.log('Titulo: ' + enlace);
    var votacion = new Votaciones(titulo, enlace);
    //this.votaciones.push(votacion);
    this.saveVotacion(votacion);
    return false;
  }

  saveVotacion(votacion : Votaciones): void {
    this.loading = true;
    this.votacionesService.crearVotacion(votacion)
        .subscribe( data => {
          this.loading = false;
          //alert("User created successfully.");
        });

  }


}
