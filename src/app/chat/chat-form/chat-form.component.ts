import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Contact} from '../contacts-box/contact/contact.model';
import {Subject} from 'rxjs';
import {tap, throttleTime} from 'rxjs/internal/operators';
import {WebsocketService} from '../../websocket';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  providers: [AuthService]
})
export class ChatFormComponent implements OnInit {
  @Input() contact: Contact;
  public typing = new Subject<string>();

  constructor(
    private authService: AuthService,
    private websocketService: WebsocketService
  ) { }
  ngOnInit() {
    this.typing.pipe(
      throttleTime(2000),
      tap(() => this.sendTypingStatus())
    ).subscribe();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  sendTypingStatus() {
    if (this.contact && !this.contact.isBot) {
      this.websocketService.send('typing', {
        to: this.contact._id
      });
    }
  }

}
