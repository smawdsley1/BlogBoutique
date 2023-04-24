import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../../models/blog-model';
import { BlogService } from '../../services/blog-service';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [SessionService, BlogService],
})
export class HomeComponent implements OnInit {

  // mockup data, change to Blogs later
  public blogs: BlogModel[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private sessionService: SessionService,
    private blogService: BlogService,
  ) {
  }

  ngOnInit() {
    // gets called only once, when the component is ready
    this.reload();
  }

  public reload()
  {
    console.log('reload');

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
