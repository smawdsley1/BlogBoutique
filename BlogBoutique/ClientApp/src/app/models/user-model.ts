export class UserModel {
  public selected?= false;

  public userId: number = 0;
  public username?: string = '';
  public firstName?: string = '';
  public lastName?: string = '';
  public emailAddress?: string = '';
  public password? = '';

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }

}
