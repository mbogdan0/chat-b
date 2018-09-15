import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Contact} from '../contacts-box/contact/contact.model';
import {ChatMessagesService} from '../../services/chat-messages.service';
import {AuthService} from '../../services/auth.service';
import chatId from '../../../../server/act/chat-id.js';
import {ChatMessages} from './chat-messages.model';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, OnChanges {
  @Input() contact: Contact;
  public chatID: string;
  public myId: string;
  public chatMessages: ChatMessages[] = [];

  constructor(
    private chatMessagesService: ChatMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.chatMessagesService.listenMessages().subscribe(data => {
      this.chatMessages = data;
    });
  }
  ngOnChanges() {
    if (this.authService.profile && this.contact) {
      this.myId = this.authService.profile._id;
      const cid = chatId(this.myId, this.contact._id);
      if (cid !== this.chatID) {
        console.log(cid);
      }
      this.chatID = cid;
    } else {
      this.chatID = null;
    }
  }

  trackByFn(index, item) {
    return item.chatId;
  }

}
