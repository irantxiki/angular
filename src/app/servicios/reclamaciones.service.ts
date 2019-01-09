import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reclamacion } from '../modelo/reclamacion.model';
import { Votaciones } from '../modelo/votaciones.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamacionesService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  private baseUrl = '/votacionesServ';

  public crearReclamacion(reclamacion: Reclamacion, fileToUpload: File) {
    const formData: FormData = new FormData();

    formData.append('file', fileToUpload);
    formData.append('reclamacion', JSON.stringify(reclamacion));

    return this.http.post(this.baseUrl + '/saveReclamacion', formData)
    .pipe(
      tap(_ => this.log(reclamacion.nombre)),
      catchError(this.handleError<any>('post file'))
    );
  }

  public pruebaFichero(fileToUpload: File): Observable<boolean> {
    const endpoint = '/votacionesServ/pruebaFichero';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(endpoint, formData).pipe(
      tap(() => this.log('holi')),
      catchError(this.handleError<any>('post file'))
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
