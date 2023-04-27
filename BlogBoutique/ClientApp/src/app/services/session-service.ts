import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/user-model";
import { catchError, map } from 'rxjs/operators';




@Injectable()
export class SessionService {
  public user: UserModel | undefined;
  public loggedIn = false;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) {
  }

  public getUsers(): Observable<UserModel[]> {
    //https://localhost:20881/api/home/GetUsers
    return this.http.get<UserModel[]>(this.apiUrl + 'api/auth/GetUsers');
  }
  public getItemById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + 'api/auth/GetItemById/' + id);
  }

  public post(user: UserModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/auth/Post', user);
  }

  public updateUser(id: number, user: UserModel): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/auth/UpdateUser/' + id, user);
  }

  public login(user: UserModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/auth/Login', user);
  }

  public toggleLogin() {
    if (this.loggedIn == false) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  public logout() {
    return this.loggedIn = false;
  }
}
