import { Injectable } from '@angular/core';
import { tipo } from '../componentes/util/TipoAlertas';

@Injectable()
export class MessageService {
  messages: Mensaje[] = [];
  log: Mensaje[] = [];
  mostrarLog = false;

  add(message: Mensaje) {
      if (message.tipo === tipo.log) {
      this.log.push(message);
    } else {
      this.messages.push(message);
    }
  }

  clear() {
    this.messages = [];
    this.log = [];
    this.mostrarLog = false;
  }
}

export interface Mensaje {
  texto: string;
  tipo: string;
}
