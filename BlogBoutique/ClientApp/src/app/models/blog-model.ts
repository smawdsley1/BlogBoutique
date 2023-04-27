import { BlogBlogTypeModel } from "./blog-blog-type-model";

export class BlogModel {
  public selected?= false;

  public blogId: number = 0;
  public title?: string = '';
  public text?: string = '';
  public image?: string = '';
  public upvote?: number = 0;
  public userId?: number = 0;
  public dateCreated?: Date = undefined;
  public dateModified?: Date = undefined;

  public blogBlogTypes: BlogBlogTypeModel[] = [];

  constructor(init?: Partial<BlogModel>) {
    Object.assign(this, init);
  }
}
