import { Component, OnInit } from '@angular/core';
import {Contact} from './contacts-box/contact/contact.model';
import {WebsocketService} from '../websocket';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public selectedContact: Contact;
  public onlineContacts$: Observable<Contact[]>;
  public onlineContacts: Contact[];
  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.onlineContacts$ = this.wsService.listen('online-contacts');
    this.onlineContacts$.subscribe(data => {
      this.onlineContacts = data;
    });


    // this.wsService.send('test', {msg: 111});
  }

  activeContact(data: Contact) {
    this.selectedContact = data;
  }

}
