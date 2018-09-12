export class ChatMessage {
  constructor(
    public _id: string,
    public message: string,
    public owner: string,
    public receiver: string,
    public chatId: string,
    public time: any,
    public seenAt?: any
  ) {}
}
