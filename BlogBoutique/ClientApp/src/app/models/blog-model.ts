export class BlogModel {
  public selected?= false;

  public userId: number = 0;
  public title?: string = '';
  public text?: string = '';
  public image?: string = '';
  public upvote?: number = 0;
  public dateCreated?: Date = undefined;
  public dateModified?: Date = undefined;

  constructor(init?: Partial<BlogModel>) {
    Object.assign(this, init);
  }
}
