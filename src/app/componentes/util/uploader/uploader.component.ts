import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent {

  currentFileUpload: File;

  @Input() porcentaje: number;
  @Output() ficheroSeleccionado: EventEmitter<File>;

  constructor() {
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
