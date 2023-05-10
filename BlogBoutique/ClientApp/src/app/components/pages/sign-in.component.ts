import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { SessionService } from '../../services/session-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticatedResponse } from '../../models/authenticatedResponse';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  providers: [SessionService],
})
export class SigninComponent implements OnInit {
  public user?: UserModel;
  private userId = 0;
  public invalidLogin: boolean | undefined;
  public errorMessage = '';

  public constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private sessionService: SessionService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.userId = parseInt(<string>id);
    console.log('got customer id: ', this.userId);

    this.reload();
  }

  public reload() {
    console.log('reload');

    if (this.userId == 0) {
      // this is an ADD
      this.user = new UserModel();
    } else {
      // invoke the C# API UsersController.GetItems()
      this.sessionService.getItemById(this.userId).subscribe(
        (result) => {
          this.user = new UserModel(result);
          console.log('got customer: ' + this.user);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    console.log('reload done');
  }

  login() {

    this.errorMessage = '';
    if (this.user?.username?.trim() == '') {
      this.errorMessage = 'Username is Required';
      return;
    }
    this.errorMessage = '';
    if (this.user?.password?.trim() == '') {
      this.errorMessage = 'Password is Required';
      return;
    }
    this.sessionService.post(<UserModel>this.user).subscribe(
      (response: AuthenticatedResponse) => {
        const token = response.token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this._router.navigate(['/home']);
      },
      (error) => {
        this.invalidLogin = true;
        this.errorMessage = 'Missing Required Information.';
        console.error(error);
      }
    );
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        // Handle the modal closing action here if needed
      },
      () => {
        // This is called when the modal is dismissed (closed without clicking the Sign Up button)
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
