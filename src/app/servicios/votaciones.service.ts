import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Votaciones } from '../modelo/votaciones.model';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VotacionesService {
  
  constructor(private http:HttpClient, private messageService: MessageService
    ) {}

  // Esto está configurado en el fichero proxy.config.json
  private baseUrl = '/votacionesServ';

  public getVotaciones(): Observable<Votaciones[]> {
    return this.http.get<Votaciones[]>( 'http://localhost:8080/votacionesServ/obtenerVotaciones')
    .pipe(
      catchError(this.handleError('getVotaciones', []))
    );
  }

  public getVotacion(id): Observable<Votaciones> {
    return this.http.get<Votaciones>(this.baseUrl + '/votaciones' + id);
  }

  public eliminarVotacion(votacion) {
    return this.http.delete(this.baseUrl + '/votaciones' + votacion.id);
  }

  public crearVotacion(votacion: Votaciones) {
    return this.http.post<Votaciones>('http://localhost:8080/votacionesServ/saveVotacion', votacion)
    .pipe(
      tap(_ => this.log(votacion.enlace)),
      catchError(this.handleError('crearVotacion', []))
    );
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VotacionesService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`VotacionesService: ${message}`);
  }
}