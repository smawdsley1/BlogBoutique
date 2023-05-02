import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { SessionService } from '../../services/session-service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SessionService],
})
export class SignupComponent implements OnInit {
  public user?: UserModel;
  private userId = 0;
  public errorMessage = '';

  public constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.userId = parseInt(<string>id);
    console.log('got user id: ', this.userId);

    this.reload();
  }

  public reload() {
    console.log('reload');

    this.user = new UserModel();
    
    console.log('reload done');
  }

  login() {
    this.errorMessage = '';
    if (this.user?.firstName?.trim() == '') {
      this.errorMessage = 'First Name is Required';
      return;
    }
    this.errorMessage = '';
    if (this.user?.lastName?.trim() == '') {
      this.errorMessage = 'Last Name is Required';
      return;
    }
    this.errorMessage = '';
    if (this.user?.username?.trim() == '') {
      this.errorMessage = 'Username is Required';
      return;
    }
    this.errorMessage = '';
    if (this.user?.emailAddress?.trim() == '') {
      this.errorMessage = 'Email Address is Required';
      return;
    }
    this.errorMessage = '';
    if (this.user?.password?.trim() == '') {
      this.errorMessage = 'Password is Required';
      return;
    }
    this.sessionService.post(<UserModel>this.user).subscribe(
      (result) => {
        this._router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Missing Required Information.';
        console.error(error);
      }
    );
  }
}
