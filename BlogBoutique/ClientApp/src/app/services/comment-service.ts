import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentModel } from "../models/comment-model";

@Injectable()
export class CommentService {
  public comments: CommentModel[] = [];

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) {
  }

  public getCommentsById(id: number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(this.apiUrl + 'api/blog/GetBlogTypes/' + id);
  }

  public post(comment: CommentModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/blog/Post', comment)
  }
}
