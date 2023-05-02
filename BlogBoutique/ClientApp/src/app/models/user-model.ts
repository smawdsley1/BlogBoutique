export class UserModel {
  public selected?= false;

  // these are database mapped, come from the API calls
  public userId: number = 0;
  public username?: string = '';
  public firstName?: string = '';
  public lastName?: string = '';
  public emailAddress?: string = '';
  public password?= '';
  public dateCreated?: Date = undefined;
  public dateModified?: Date = undefined;

  constructor(init?: Partial<UserModel>) { // allows us to assign this object C# style
    Object.assign(this, init); // copies all the properties of 'init' that exist in the 'this' object
  }
}
