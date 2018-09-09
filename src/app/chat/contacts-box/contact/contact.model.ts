export class Contact {
  constructor(
    public id: string,
    public username: string,
    public picture: string,
    public isbot: boolean,
    public lastmsg: string,
    public active: boolean,
    public time: any,
    public online: boolean,
    public botdesc?: string
  ) {}
}

