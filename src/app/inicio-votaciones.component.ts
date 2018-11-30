import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'inicio-votaciones',
  templateUrl: './inicio-votaciones.html',
  styleUrls: ['./app.component.css']
})
export class InicioVotacionesComponent {

  constructor(private router: Router) {
  }
}
