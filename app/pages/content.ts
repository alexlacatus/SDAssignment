import {User} from "./user/user";

export class Content{


  private _contentId:number;

  private _contentUser:User;


  private _contentText:string;


  private _contentDateTime:string;


  private _contentPicture:string;


  constructor(contentId: number, contentUser: User, contentText: string, contentDateTime: string, contentPicture: string) {
    this._contentId = contentId;
    this._contentUser = contentUser;
    this._contentText = contentText;
    this._contentDateTime = contentDateTime;
    this._contentPicture = contentPicture;
  }

  get contentId(): number {
    return this._contentId;
  }

  set contentId(value: number) {
    this._contentId = value;
  }

  get contentUser(): User {
    return this._contentUser;
  }

  set contentUser(value: User) {
    this._contentUser = value;
  }

  get contentText(): string {
    return this._contentText;
  }

  set contentText(value: string) {
    this._contentText = value;
  }

  get contentDateTime(): string {
    return this._contentDateTime;
  }

  set contentDateTime(value: string) {
    this._contentDateTime = value;
  }

  get contentPicture(): string {
    return this._contentPicture;
  }

  set contentPicture(value: string) {
    this._contentPicture = value;
  }
}
