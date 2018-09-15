class ChatUser {
  constructor(
    public _id: string,
    public username: string
  ) {}
}

export class ChatMessage {
  constructor(
    public _id: string,
    public message: string,
    public owner: ChatUser,
    public receiver: ChatUser,
    public chatId: string,
    public time: any,
    public seenAt?: any
  ) {}
}
