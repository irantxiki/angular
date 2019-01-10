import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UploaderService } from '../../../servicios/uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  providers: [ UploaderService ]
})
export class UploaderComponent {

  currentFileUpload: File;

  @Input() porcentaje: number;
  @Output() ficheroSeleccionado: EventEmitter<File>;

  constructor(private uploaderService: UploaderService) {
    this.ficheroSeleccionado = new EventEmitter();
  }

  selectFile(event: any) {
    if (event.target.files) {
      this.currentFileUpload = event.target.files[0];
    } else {
      this.currentFileUpload = null;
    }

    this.ficheroSeleccionado.emit(this.currentFileUpload);
  }
}
