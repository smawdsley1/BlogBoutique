import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticatedResponse } from '../../models/authenticatedResponse';
import { UserModel } from '../../models/user-model';
import { SessionService } from '../../services/session-service';
import jwt_decode, { JwtPayload } from 'jwt-decode';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  isExpanded = false;
  private dialog: NgbModalRef | undefined = undefined;
  invalidLogin = true;
  public user = new UserModel;
  private userId = 0;
  public errorMessage = '';

  public constructor(private _router: Router,
    private modalService: NgbModal,
    private sessionService: SessionService,
  ) {

  }

  public goToAccount() {
    this._router.navigate(['/account', this.userId]);
    this.dialog?.close();
  }

  public goToSignUp() {
    this._router.navigate(['/sign-up']);
    this.dialog?.close();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

  logout() {
    this.sessionService.logout();
    this._router.navigate(['/home']);
  }

  open(content: any) {
    this.dialog = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  cancel() {
    this.dialog?.close();
  }

  save() {
    this.errorMessage = '';
    if (this.user?.username?.trim() == '') {
      this.errorMessage = "Username is Required";
      return;
    }
    if (this.user?.password?.trim() == '') {
      this.errorMessage = "Password is Required";
      return;
    }
    this.sessionService.login(<UserModel>this.user).subscribe(
      (response: AuthenticatedResponse) => {
        const token = response.token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.dialog?.close();

        //take token, decode, and save userId
        let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
        this.userId = parseInt(decodedJWT.userId);

        this.sessionService.userId = parseInt(decodedJWT.userId);

        // navigate away
        this._router.navigate(['/home']);
        console.log("Logged in");
      },
      (error) => {
        this.errorMessage = 'Email/Username/Password is Invalid';
        this.invalidLogin = true;
        console.error(error);
      }
    );
  }
}
