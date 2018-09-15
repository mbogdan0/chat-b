import {AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Contact} from './contact/contact.model';
import {AuthService} from '../../services/auth.service';
import chatId from '../../../../server/act/chat-id.js';
import {WebsocketService} from '../../websocket';

@Component({
  selector: 'app-contacts-box',
  templateUrl: './contacts-box.component.html',
  styleUrls: ['./contacts-box.component.scss']
})
export class ContactsBoxComponent {
  @Input() contacts: Contact[];
  @Output() selectContact = new EventEmitter<Contact>();
  public onlineOnly = true;
  public searchTerm: string;
  constructor(
    private authService: AuthService,
    private websocketService: WebsocketService
  ) { }
  makeActive(id: string) {
    const contacts = this.contacts.slice(0);
    contacts.forEach((item: Contact) => {
      item.active = false;
      if (item._id === id) {
        item.active = true;
        this.loadChatHistory(item._id);
        this.selectContact.emit(item);
      }
    });
    this.contacts = contacts;
  }
  searchBox(search: string) {
    this.searchTerm = search;
  }
  profileId() {
    return this.authService.profile ? this.authService.profile._id : null;
  }
  loadChatHistory(contactId) {
    const uid = this.authService.profile ? this.authService.profile._id : null;
    if (uid) {
      const cid = chatId(uid, contactId);
      this.websocketService.send('chat-history', {chatId: cid});
    }
  }
  trackByFn(index, item) {
    return item._id;
  }
}
