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
  private selectFirstContactOnce = false;
  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.onlineContacts$ = this.wsService.listen('online-contacts');
    this.onlineContacts$.subscribe(data => {
      this.onlineContacts = this.selectFirstContact(data);
    });
  }
  selectFirstContact(data: Contact[]) {
    if (!this.selectFirstContactOnce && data.length) {
      const contacts = data.slice(0);
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].online) {
          contacts[i].active = true;
          this.selectedContact = contacts[i];
          break;
        }
      }
      this.selectFirstContactOnce = true;
      return contacts;
    }
    return data;
  }
  activeContact(data: Contact) {
    this.selectedContact = data;
  }

}
