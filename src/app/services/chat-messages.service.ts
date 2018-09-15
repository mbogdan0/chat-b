import { Injectable } from '@angular/core';
import {WebsocketService} from '../websocket';
import {ChatMessage} from '../chat/chat-messages/chat-message.model';
import {ChatMessages} from '../chat/chat-messages/chat-messages.model';
import {merge, Observable, of, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/internal/operators';

class ChatEvent {
  constructor(
    data: ChatMessages[],
    event: 'many' | 'one'
  ) {}
}


@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  private data: ChatMessages[] = [];

  constructor(private websocketService: WebsocketService) { }
  listenMessages() { // chat_msg
    return merge(
      this.websocketService.listen('receive_chat').pipe(
        switchMap((obj: any) => this.onMessages(obj))
      ),
      this.websocketService.listen('chat_msg').pipe(
        switchMap((obj: any) => this.onMessage(obj))
      )
    );
  }

  private addMessage(obj: ChatMessage, arr: ChatMessage[]) {
    if (!arr.some(el => el._id === obj._id)) {
      arr.push(obj);
    }
    return arr.sort((a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf());
  }

  private onMessage(obj: ChatMessage): Observable<ChatEvent> {
    if (obj) {
      let was = false;
      this.data.forEach(item => {
        if (item.chatId === obj.chatId) {
          was = true;
          item.data = this.addMessage(obj, item.data);
        }
      });
      if (!was) {
        this.data.push({
          chatId: obj.chatId,
          data: [obj]
        });
      }
    }
    return of({data: this.data, event: 'one'});
  }

  private onMessages(obj: ChatMessage[]): Observable<ChatEvent> {
    if (obj && obj[0] && obj[0].chatId) {
      let was = false;
      this.data.forEach(item => {
        if (item.chatId === obj[0].chatId) {
          was = true;
          obj.forEach(msg => {
            item.data = this.addMessage(msg, item.data);
          });
        }
      });
      if (!was) {
        this.data.push({
          chatId: obj[0].chatId,
          data: obj
        });
      }
    }
    return of({data: this.data, event: 'many'});
  }
}
