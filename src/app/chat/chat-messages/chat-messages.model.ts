import {ChatMessage} from './chat-message.model';

export class ChatMessages {
  constructor(
    public chatId: string,
    public data: ChatMessage[]
  ) {}
}

