import {Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Contact} from '../chat/contacts-box/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
   private socket;

   constructor (private authService: AuthService) {
     this.init();
   }
   init() { // to be able re-init socket if token is changed
     if (this.socket) {
       this.socket.disconnect();
     }
     const config: any = {};
     if (this.authService.token) { // pass token as query
       config.query = `token=${this.authService.token}`;
     }
     this.socket = io(environment.socketUrl, config);
   }
   ngOnDestroy() {
     this.socket.disconnect();
   }

   listen(event: string): Observable<Contact[]> {
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
