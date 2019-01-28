import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reclamacion } from '../modelo/reclamacion.model';
import { tipo } from '../componentes/util/TipoAlertas';
import Utils from '../componentes/util/Utils';
import { ReclamacionesSource } from '../modelo/reclamacion.interface';
import { UsuarioReclamacion } from '../componentes/comun/tabla/tabla.component';

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
    return this.http.get<Reclamacion[]>( this.baseUrl +  '/obtenerReclamaciones')
    .pipe(
      catchError(this.handleError('getReclamaciones', []))
    );
  }

  public getReclamacionesUsuario(): Observable<UsuarioReclamacion[]> {
    return this.http.get<UsuarioReclamacion[]>( this.baseUrl +  '/obtenerUsuariosReclamaciones')
    .pipe(
      catchError(this.handleError('getReclamacionesUsuario', []))
    );
  }

  public searchInReclamacionesAttachment(textoBusqueda: string): Observable<ReclamacionesSource[]> {
    const params = new HttpParams().set('textoBusqueda', textoBusqueda);
    return this.http.get<ReclamacionesSource[]>( this.baseUrl +  '/searchInReclamacionesAttachment', { params: params })
    .pipe(
      catchError(this.handleError('searchInReclamacionesAttachment', []))
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
