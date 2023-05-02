export class PhotoModel {
  public selected?= false;

  public photoId: number = 0;
  public blogId?: number = 0;
  public url?: string = '';
  public dateCreated?: Date = undefined;

  constructor(init?: Partial<PhotoModel>) {
    Object.assign(this, init);
  }
}
