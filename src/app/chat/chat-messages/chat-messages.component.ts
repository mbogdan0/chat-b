import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../contacts-box/contact/contact.model';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {
  @Input() contact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
