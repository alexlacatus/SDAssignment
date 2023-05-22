import {User} from "./user/user";

export class Content{




  private contentUser:User;


  private contentText:string;


  private contentDateTime:Date;


  private contentPicture:string;


  constructor( contentUser: User, contentText: string, contentDateTime: Date, contentPicture: string) {

    this.contentUser = contentUser;
    this.contentText = contentText;
    this.contentDateTime = contentDateTime;
    this.contentPicture = contentPicture;
  }



  get _contentUser(): User {
    return this.contentUser;
  }

  set _contentUser(value: User) {
    this.contentUser = value;
  }

  get _contentText(): string {
    return this.contentText;
  }

  set _contentText(value: string) {
    this.contentText = value;
  }

  get _contentDateTime(): Date {
    return this.contentDateTime;
  }

  set _contentDateTime(value: Date) {
    this.contentDateTime = value;
  }

  get _contentPicture(): string {
    return this.contentPicture;
  }

  set _contentPicture(value: string) {
    this.contentPicture = value;
  }
}
