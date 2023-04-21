import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router"
import { BlogModel } from "../../models/blog-model";
import { UserModel } from "../../models/user-model";
import { BlogService } from "../../services/blog-service";
import { SessionService } from "../../services/session-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [BlogService],
})

export class HomeComponent implements OnInit {
  public blogs: BlogModel[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private blogService: BlogService,
  ) { }


  ngOnInit() {
    this.reload();
  }

  public reload() {
    console.log("reload");

    this.blogService.getBlogs().subscribe(
      result => {
        this.blogs = result.map(x => new BlogModel(x));
        console.log('got blogs; ' + this.blogs);
      },
      error => {
        console.log(error);
      }
    );

    console.log('reload done')
  }

  public goToBlog(BlogId: number | undefined) {
    this._router.navigate(['/blog', BlogId]);
  }

}
