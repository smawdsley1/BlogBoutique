import { BlogTypeModel } from "./blog-type-model";

export class BlogBlogTypeModel {
  public selected?= false;

  public blogBlogTypeId: number = 0;
  public blogId: number = 0;
  public blogTypeId: number = 0;

  public blogTypes?: BlogTypeModel = undefined;

  constructor(init?: Partial<BlogBlogTypeModel>) {
    Object.assign(this, init);
  }
}
