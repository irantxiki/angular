import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Votaciones } from './votaciones.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VotacionesService {

  constructor(private http:HttpClient) {}

  //private userUrl = 'http://localhost:8080/user-portal/user';
  private linkUrl = '/api';
  
  public getVotaciones() {
    return this.http.get<Votaciones[]>(this.linkUrl);
  }

  public eliminarVotacion(votacion) {
    return this.http.delete(this.linkUrl + "/"+ votacion.id);
  }

  public crearVotacion(votacion) {
    return this.http.post<Votaciones>(this.linkUrl, votacion);
  }

}
