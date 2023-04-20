import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs";
import { UserModel } from "../models/user-model";


@Injectable()
export class SessionService {
  public user: UserModel | undefined;

  constructor(
  private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) {

  }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl + 'api/auth/GetUsers');
  }
}


