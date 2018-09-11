import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {WebsocketService} from '../../../websocket';
import {Contact} from '../../contacts-box/contact/contact.model';
import {delay, tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-chat-form-typing',
  templateUrl: './chat-form-typing.component.html',
  styleUrls: ['./chat-form-typing.component.scss']
})
export class ChatFormTypingComponent implements OnInit, OnChanges {
  public contactTyping: boolean;
  @Input() contact: Contact;
  constructor(
    private websocketService: WebsocketService
  ) { }
  ngOnChanges() {
    this.contactTyping = false;
  }
  ngOnInit() {
    this.websocketService.listen('receive_typing').pipe(
      tap((data: any) => {
        if (data && data.user === this.contact._id) {
          this.contactTyping = true;
        }
      }),
      delay(2000),
      tap(() => {
        this.contactTyping = false;
      })
    ).subscribe();
  }

}
