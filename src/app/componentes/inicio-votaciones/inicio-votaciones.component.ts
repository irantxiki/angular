import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-votaciones',
  templateUrl: './inicio-votaciones.component.html',
  styleUrls: ['../../app.component.css']
})
export class InicioVotacionesComponent {

  constructor(private router: Router) {
  }
}
