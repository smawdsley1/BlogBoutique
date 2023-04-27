export class BlogTypeModel {
  public selected?= false;

  public blogTypeId: number = 0;
  public name?: string = '';

  constructor(init?: Partial<BlogTypeModel>) {
    Object.assign(this, init);
  }
}
