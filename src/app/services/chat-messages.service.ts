import { Injectable } from '@angular/core';
import {WebsocketService} from '../websocket';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  constructor(private websocketService: WebsocketService) {

  }


}
