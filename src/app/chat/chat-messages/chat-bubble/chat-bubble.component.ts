import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../chat-message.model';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent {
  @Input() message: ChatMessage;
  @Input() uid: string;
  @Input() last: boolean;
  constructor() { }
}
