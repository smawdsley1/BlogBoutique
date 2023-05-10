export class CommentModel {
  public selected?= false;

  public commentId: number = 0;
  public blogId: number = 0;
  public userId: number = 0;
  public text?: string = '';
  public dateCreated?: Date = undefined;

  constructor(init?: Partial<CommentModel>) {
    Object.assign(this, init);
  }
}
