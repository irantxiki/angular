import { Component } from '@angular/core';
import { MessageService } from '../../../servicios/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
