import { Injectable } from '@angular/core';
import {WebsocketService} from '../websocket';
import {ChatMessage} from '../chat/chat-messages/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  private data: ChatMessage[];
  constructor(private websocketService: WebsocketService) {

  }



}
