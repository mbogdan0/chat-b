import { Component, OnInit } from '@angular/core';
import {Contact} from './contacts-box/contact/contact.model';
import {WebsocketService} from '../websocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public selectedContact: Contact;
  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.wsService.listen('ev').subscribe(a => {
      console.log(a);
    });

    this.wsService.send('test', {msg: 111});
  }

  activeContact(data: Contact) {
    this.selectedContact = data;
  }

}
