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

  public getItemById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + 'api/auth/GetItemById/' + id);
  }

  public post(user: UserModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/auth/Post', user);
  }

  public put(id: number, user: UserModel): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/auth/Put/' + id, user);
  }

 /* public isLoggedIn() {
    return this.customerId > 0;
  }

  public logout() {
    return this.customerId = 0;
  }*/

  /*public login(user: CustomerModel): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/auth/Login', user);
  }*/
}


