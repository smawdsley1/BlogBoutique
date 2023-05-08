import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-post',
  templateUrl: './edit-account.component.html',
  providers: [SessionService],
})
export class EditAccountComponent implements OnInit {
  currentUser: UserModel = new UserModel();
  userId: number = 0;
  errorMessage: string = '';
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private sessionService: SessionService,
    private _route: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.userId = parseInt(<string>id);
    console.log('got user id: ', this.userId);

    this.reload();
  }

  public reload() {
    console.log('reload');

    this.sessionService.getItemById(this.userId).subscribe(
      (result) => {
        this.currentUser = new UserModel(result);
        console.log('got customer: ' + this.currentUser);
      },
      (error) => {
        console.error(error);
      }
    );

    console.log('reload done');
  }

  public update() {
    console.log('starting update')
    this.errorMessage = '';
    if (this.currentUser?.firstName?.trim() == '') {
      this.errorMessage = 'First Name is Required';
      return;
    }
    this.errorMessage = '';
    if (this.currentUser?.lastName?.trim() == '') {
      this.errorMessage = 'Last Name is Required';
      return;
    }
    this.errorMessage = '';
    if (this.currentUser?.username?.trim() == '') {
      this.errorMessage = 'Username is Required';
      return;
    }
    this.errorMessage = '';
    if (this.currentUser?.emailAddress?.trim() == '') {
      this.errorMessage = 'Email Address is Required';
      return;
    }
    this.errorMessage = '';
    if (this.oldPassword?.trim() == '') {
      this.errorMessage = 'Previous Password is Required';
      return;
    }
    this.errorMessage = '';
    if (this.newPassword?.trim() == '') {
      this.errorMessage = 'New Password is Required';
      return;
    }
    this.errorMessage = '';
    if (this.currentUser?.password != this.oldPassword) {
      this.errorMessage = 'Your Previous Password is Incorrect';
      return;
    }

    this.sessionService.updateUser(this.userId, <UserModel>this.currentUser).subscribe(
      (result) => {
        this.sessionService.userId = result.userId;
        this._router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Missing Required Information.';
        console.error(error);
      }
    );
  }
}
