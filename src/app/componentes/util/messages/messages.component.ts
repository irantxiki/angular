import { Component } from '@angular/core';
import { MessageService } from '../../../servicios/message.service';
import { Mensaje } from '../../../servicios/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})

export class MessagesComponent {
  log = false;

  constructor(public messageService: MessageService) { }

  commutar() {
    let mensajes: Mensaje[] = [];

    if (this.log) {
      mensajes = this.messageService.log;
    } else {
      mensajes = this.messageService.messages;
    }
    this.log = !this.log;

    return mensajes;
  }
}
