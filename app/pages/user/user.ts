export class User {
  private _userId: number;
  private _lastName: string;
  private _firstName: string;
  private _email: string;
  private _password: string;
  private _profilePicture: string;


  constructor(userId: number, lastName: string, firstName: string, email: string, password: string, profilePicture: string) {
    this._userId = userId;
    this._lastName = lastName;
    this._firstName = firstName;
    this._email = email;
    this._password = password;
    this._profilePicture = profilePicture;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get profilePicture(): string {
    return this._profilePicture;
  }

  set profilePicture(value: string) {
    this._profilePicture = value;
  }
}
