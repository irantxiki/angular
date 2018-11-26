import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

// Votaciones Class
import { Votaciones } from './votaciones.model';
import { VotacionesService } from './votaciones.service';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() votacionInput: Votaciones;

  //votaciones: Votaciones[];
  
  constructor(private router: Router, private votacionesService: VotacionesService) {

  }

  votoPositivo() {
    this.votacionInput.votoPositivo();
  }

  votoNegativo() {
    this.votacionInput.votoNegativo();
  }

  ngOnInit() {
    /*this.votacionesService.getVotaciones().subscribe(
    data => this.votaciones = data 
    );*/
  }

  

}
