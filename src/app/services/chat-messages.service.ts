import { Injectable } from '@angular/core';
import {WebsocketService} from '../websocket';
import {ChatMessage} from '../chat/chat-messages/chat-message.model';
import {ChatMessages} from '../chat/chat-messages/chat-messages.model';
import {of, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  private data: ChatMessages[] = [];

  constructor(private websocketService: WebsocketService) { }
  listenMessages() {
    return this.websocketService.listen('receive_chat').pipe(
      tap((obj: any) => {
        this.onMessage(obj);
      }),
      switchMap(() => of(this.data))
    );
  }

  private onMessage(obj: ChatMessage) {
    let was = false;
    this.data.forEach(item => {
      if (item.chatId === obj.chatId) {
        was = true;
        item.data.push(obj);
      }
    });
    if (!was) {
      this.data.push({
        chatId: obj.chatId,
        data: [obj]
      });
    }
  }
}
