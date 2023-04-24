import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../../models/blog-model';
import { BlogService } from '../../services/blog-service';

@Component({
  selector: 'app-post',
  templateUrl: './blog.component.html',
  providers: [BlogService],

})
export class BlogComponent implements OnInit {

  public item: BlogModel | undefined;
  private blogId = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private blogService: BlogService,
  ) {
  }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.blogId = parseInt(<string>id);
    console.log('got equipment id: ', this.blogId);

    this.reload();
  }

  public reload() {

    console.log('reload');

    // invoke the C# API UsersController.GetItems()
    this.blogService.getItemById(this.blogId).subscribe(
      result => {
        this.item = new BlogModel(result);
        console.log('got blog: ' + this.item);
      },
      error => {
        console.error(error);
      }
    );
    console.log('reload done');
  }

  public goBack() {
    this._router.navigate(['/home']);
  }
}
