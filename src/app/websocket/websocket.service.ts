import {Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
   private socket;

   constructor (private authService: AuthService) {
     this.socket = io(environment.socketUrl, {
       query: `token=${this.authService.token}`
     });
   }

   ngOnDestroy() {
     this.socket.disconnect();
     this.socket.on('connect', () => {
       console.log('Socket is connected');
     });
   }

   listen(event: string) {
     return new Observable(observer => {
       this.socket.on(event, (data) => {
         observer.next(data);
       });
       return () => {
         this.socket.disconnect();
       };
     });
  }
  send(event: string, data: object) {
    const toSend = {
      ...data,
      _token: this.authService.token
    };
    this.socket.emit(event, toSend);
  }
}
