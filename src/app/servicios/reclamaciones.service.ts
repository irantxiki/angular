import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { Reclamacion } from '../modelo/reclamacion.model';
import { tipo } from '../componentes/util/TipoAlertas';
import Utils from '../componentes/util/Utils';

@Injectable({
  providedIn: 'root'
})
export class ReclamacionesService {

  constructor(private http: HttpClient, private messageService: MessageService) {
    messageService.clear();
   }
  private baseUrl = '/votacionesServ';

  public crearReclamacion(reclamacion: Reclamacion, fileToUpload: File) {
    const formData: FormData = new FormData();

    formData.append('file', fileToUpload);
    formData.append('reclamacion', JSON.stringify(reclamacion));

    return this.http.post(this.baseUrl + '/saveReclamacion', formData,
      {reportProgress: true, observe: 'events'})
      .pipe(
        map(event => Utils.manageHttpEvents(event)),
        catchError(this.handleError<any>('post file'))
      );
  }

  public getReclamaciones(): Observable<Reclamacion[]> {
    return this.http.get<Reclamacion[]>( this.baseUrl +  '/obtenerReclamacion')
    .pipe(
      catchError(this.handleError('getReclamaciones', []))
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
      this.messageService.add({texto: error, tipo: tipo.error});

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VotacionesService message with the MessageService */
  private log(message: string) {
    this.messageService.add({texto: message, tipo: tipo.error});
  }
}
