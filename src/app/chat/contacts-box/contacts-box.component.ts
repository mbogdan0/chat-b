import {AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Contact} from './contact/contact.model';

@Component({
  selector: 'app-contacts-box',
  templateUrl: './contacts-box.component.html',
  styleUrls: ['./contacts-box.component.scss']
})
export class ContactsBoxComponent {
  @Input() contacts: Contact[];
  // public contacts = [
  //   {
  //     username: 'Reserve Bot',
  //     picture: 'https://www.dogalize.com/wp-content/uploads/2017/06/cat-300572_640-200x200.jpg',
  //     isbot: true,
  //     botdesc: 'Bot description',
  //     lastmsg: 'Hello dear how are you?',
  //     active: false,
  //     online: true,
  //     time: (new Date()).valueOf(),
  //     id: '1'
  //   },
  //   {
  //     username: 'Bogdan',
  //     picture: 'https://www.dogalize.com/wp-content/uploads/2017/06/cat-300572_640-200x200.jpg',
  //     isbot: false,
  //     lastmsg: 'honey',
  //     active: false,
  //     online: false,
  //     time: (new Date()).valueOf(),
  //     id: '2'
  //   },    {
  //     username: 'Alice',
  //     picture: 'https://www.dogalize.com/wp-content/uploads/2017/06/cat-300572_640-200x200.jpg',
  //     isbot: false,
  //     lastmsg: 'message example',
  //     online: true,
  //     active: false,
  //     time: (new Date()).valueOf(),
  //     id: '3'
  //   }
  // ];
  @Output() selectContact = new EventEmitter<Contact>();
  public onlineOnly = true;
  public searchTerm: string;
  constructor() { }
  makeActive(id: string) {
    const contacts = this.contacts.slice(0);
    contacts.forEach((item: Contact) => {
      item.active = false;
      if (item._id === id) {
        item.active = true;
        this.selectContact.emit(item);
      }
    });
    this.contacts = contacts;
  }
  searchBox(search: string) {
    this.searchTerm = search;
  }
  trackByFn(index, item) {
    return item._id;
  }
}
