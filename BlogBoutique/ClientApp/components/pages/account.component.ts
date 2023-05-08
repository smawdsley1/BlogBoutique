import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../../models/blog-model';
import { UserModel } from '../../models/user-model';
import { BlogService } from '../../services/blog-service';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-post',
  templateUrl: './account.component.html',
  providers: [SessionService, BlogService],
})
export class AccountComponent {
  public user?: UserModel;
  public blogs: BlogModel[] = [];
  public userId = 0;

  public constructor(private _router: Router,
    private _route: ActivatedRoute,
    private sessionService: SessionService,
    private blogService: BlogService,
  ) {
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
      result => {
        this.user = new UserModel(result);
      },
      error => {
        console.log(error);
      }
    );

    this.blogService.getBlogsByUserId(this.userId).subscribe(
      result => {
        this.blogs = result.map(x => new BlogModel(x));
        console.log('got blogs; ' + this.blogs);
      },
      error => {
        console.log(error);
      }
    );

    console.log('reload done');
  }

  public goToPost() {
    this._router.navigate(['/post', this.userId]);
  }

  public edit(blogId: number | undefined) {
    this._router.navigate(['/edit-blog', blogId, this.userId]);
  }

  public editAccount() {
    this._router.navigate(['/edit-account', this.userId]);
  }

  public goToBlog(blogId: number | undefined) {
    this._router.navigate(['/blog', blogId]);
  }

}
