import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../contacts-box/contact/contact.model';
import {ChatMessagesService} from '../../services/chat-messages.service';
import {AuthService} from '../../services/auth.service';
import chatId from '../../../../server/act/chat-id.js';
import {ChatMessages} from './chat-messages.model';
import {WebsocketService} from '../../websocket';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit, OnChanges {
  @Input() contact: Contact;
  @ViewChild('chatEl') private chatEl: ElementRef;
  public chatID: string;
  public myId: string;
  public chatMessages: ChatMessages[] = [];
  private offset = 10;
  private limit = 10;

  constructor(
    private chatMessagesService: ChatMessagesService,
    private authService: AuthService,
    private websocketService: WebsocketService
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
        this.offset = 10;
      }
      this.chatID = cid;
    } else {
      this.chatID = null;
    }
    setTimeout(() => {
      this.chatEl.nativeElement.scrollTop = this.chatEl.nativeElement.scrollHeight;
    }, 100);
  }
  onScroll() {
    this.loadMessages();
  }
  loadMessages() {
    this.offset += this.limit;
    this.websocketService.send('chat-history', {
      chatId: this.chatID,
      offset: this.offset,
      limit: this.limit
    });
  }
  trackByFn(index, item) {
    return item.chatId;
  }

}
