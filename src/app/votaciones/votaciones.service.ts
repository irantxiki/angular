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

  //Esto está configurado en el fichero proxy.config.json
  private baseUrl = '/votaciones';
  
  public getVotaciones() {
    return this.http.get<Votaciones[]>(this.baseUrl);
  }

  public eliminarVotacion(votacion) {
    return this.http.delete(this.baseUrl + votacion.id);
  }

  public crearVotacion(votacion) {
    return this.http.post<Votaciones>(this.baseUrl, votacion);
  }

}
