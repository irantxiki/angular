import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Votaciones } from '../modelo/votaciones.model';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

import { tipo } from '../componentes/util/TipoAlertas';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService {

  constructor(private http: HttpClient, private messageService: MessageService) {
    messageService.clear();
  }

  // Esto está configurado en el fichero proxy.config.json
  private baseUrl = '/votacionesServ';

  public getVotaciones(): Observable<Votaciones[]> {
    return this.http.get<Votaciones[]>( this.baseUrl +  '/obtenerVotaciones')
    .pipe(
      catchError(this.handleError('getVotaciones', []))
    );
  }

  public eliminarVotacion(votacion: Votaciones) {
    return this.http.post<Votaciones>(this.baseUrl + '/deleteVotacion', votacion)
    .pipe(
      tap(_ => this.log(votacion.enlace)),
      catchError(this.handleError('eliminarVotacion', []))
    );
  }

  public crearVotacion(votacion: Votaciones) {
    return this.http.post<Votaciones>(this.baseUrl + '/saveVotacion', votacion)
    .pipe(
      tap(_ => this.log(votacion.enlace)),
      catchError(this.handleError('crearVotacion', []))
    );
  }

  public actualizarVotacion(votacion: Votaciones) {
    return this.http.post<Votaciones>(this.baseUrl + '/actualizar', votacion);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.messageService.add({texto: error.message, tipo: tipo.error});

      // Let the app keep running by returning an empty result.
      return Observable.throw(result as T);
    };
  }

  /** Log a VotacionesService message with the MessageService */
  private log(message: string) {
    this.messageService.add({texto: message, tipo: tipo.log});
  }
}
