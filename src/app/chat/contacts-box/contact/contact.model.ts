export class Contact {
  constructor(
    public _id: string,
    public username: string,
    public picture: string,
    public isBot: boolean,
    public lastmsg: string,
    public active: boolean,
    public time: any,
    public online: boolean,
    public botDescription?: string
  ) {}
}

