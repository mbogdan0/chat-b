import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from '../../../websocket';
import {Contact} from '../../contacts-box/contact/contact.model';

@Component({
  selector: 'app-chat-form-typing',
  templateUrl: './chat-form-typing.component.html',
  styleUrls: ['./chat-form-typing.component.scss']
})
export class ChatFormTypingComponent implements OnInit {
  public contactTyping: boolean;
  public receiveTyping$: any;
  @Input() contact: Contact;
  constructor(
    private websocketService: WebsocketService
  ) { }

  ngOnInit() {

    this.receiveTyping$ = this.websocketService.listen('receive_typing');
    this.receiveTyping$.subscribe(data => {
      if (data && data.user === this.contact._id) {
        this.contactTyping = true;
      }
    });
  }

}
