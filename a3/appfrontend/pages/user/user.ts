export class User {

  private lastName: string;
  private firstName: string;
  private email: string;
  private password: string;
  private profilePicture: string;


  constructor( lastName: string, firstName: string, email: string, password: string, profilePicture: string) {

    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.password = password;
    this.profilePicture = profilePicture;
  }



  get _lastName(): string {
    return this.lastName;
  }

  set _lastName(value: string) {
    this.lastName = value;
  }

  get _firstName(): string {
    return this.firstName;
  }

  set _firstName(value: string) {
    this.firstName = value;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }

  get _profilePicture(): string {
    return this.profilePicture;
  }

  set _profilePicture(value: string) {
    this.profilePicture = value;
  }
}
