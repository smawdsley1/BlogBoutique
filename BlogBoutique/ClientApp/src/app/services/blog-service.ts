import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlogModel } from '../models/blog-model';

@Injectable()
export class BlogService {
  public posts: BlogModel[] = [];
  private APIUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.APIUrl = `${apiUrl}api/blog`;
  }

  public getBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(this.APIUrl + '/GetBlogs/');
  }

  public getItemById(id: number): Observable<BlogModel> {
    return this.http.get<BlogModel>(this.APIUrl + 'api/home/GetItemById/' + id);
  }
}
