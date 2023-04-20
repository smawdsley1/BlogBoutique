import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router"
import { UserModel } from "../../models/user-model";
import { SessionService } from "../../services/session-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [SessionService],
})

export class HomeComponent implements OnInit {
  public users: UserModel[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private sessionService: SessionService,
  ) { }


  ngOnInit() {
    this.reload();
  }

  public reload() {
    console.log("reload");

    this.sessionService.getUsers().subscribe(
      result => {
        this.users = result.map(x => new UserModel(x));
        console.log('got users; ' + this.users);
      },
      error => {
        console.log(error);
      }
    );

    console.log('reload done')
  }

}
