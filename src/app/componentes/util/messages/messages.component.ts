import { Component } from '@angular/core';
import { MessageService } from '../../../servicios/message.service';
import { Mensaje } from '../../../servicios/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})

export class MessagesComponent {

  constructor(public messageService: MessageService) { }

  commutar() {
    let mensajes: Mensaje[] = [];

    if (this.messageService.mostrarLog) {
      mensajes = this.messageService.log;
    } else {
      mensajes = this.messageService.messages;
    }

    return mensajes;
  }
}
