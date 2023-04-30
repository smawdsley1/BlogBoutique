import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlogModel } from '../models/blog-model';
import { BlogTypeModel } from '../models/blog-type-model';
import { UserModel } from '../models/user-model';

@Injectable()
export class BlogService {
  public posts: BlogModel[] = [];

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) {
  }

  public getBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.apiUrl + 'api/blog/GetBlogs/');
  }

  public getItemById(id: number): Observable<BlogModel> {
    return this.http.get<BlogModel>(this.apiUrl + 'api/blog/GetItemById/' + id);
  }

  public getBlogsByUserId(id: number): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.apiUrl + 'api/blog/GetItemsByUserId/' + id);
  }

  public getBlogTypes(): Observable<BlogTypeModel[]> {
    return this.http.get<BlogTypeModel[]>(this.apiUrl + 'api/blog/GetBlogTypes/');
  }

  public post(blog: BlogModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/blog/Post', blog)
  }

  public getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + 'api/auth/GetItemById/' + id);
  }

  public updateBlog(id: number, blog: BlogModel): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/blog/UpdateBlog/' + id, blog);
  }

}
