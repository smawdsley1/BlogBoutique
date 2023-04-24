import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlogModel } from '../models/blog-model';

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
}
