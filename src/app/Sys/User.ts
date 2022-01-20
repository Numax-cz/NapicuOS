export class User {
  private username: string = 'user';
  private declare password: string;
  constructor() {}

  //* * * *  Getters * * *
  public get_username(): string {
    return this.username;
  }
  public get_password(): string {
    return this.password;
  }

  //* * * *  Setters * * *
  public set_username(value: string): void {
    this.username = value;
  }
  public set_password(value: string): void {
    this.password = value;
  }
}
