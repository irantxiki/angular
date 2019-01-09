import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { Reclamacion } from '../modelo/reclamacion.model';
<<<<<<< HEAD
=======
import { Votaciones } from '../modelo/votaciones.model';
import { tipo } from '../componentes/util/TipoAlertas';
>>>>>>> e7d703ddeceeb26bf200618f855b76828e20c2f4

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
        map(event => this.getEventMessage(event))
      );
  }

  private getEventMessage (event: HttpEvent<any>) {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round(100 * event.loaded / event.total);
      return percentDone;
    } /*else if (event instanceof HttpResponse) {
      return null;
    }*/
  }
}
