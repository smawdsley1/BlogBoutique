import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../../models/blog-model';
import { BlogService } from '../../services/blog-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  providers: [BlogService],
})
export class EditBlogComponent implements OnInit {
  currentBlog: BlogModel = new BlogModel();
  blogId: number = 0;
  errorMessage: string = '';

  constructor(private blogService: BlogService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.blogId = parseInt(<string>id);
    console.log('got blog id: ', this.blogId);

    this.reload();
  }

  public reload() {
    console.log('reload');

    // Invoke the C# API BlogsController.GetItemById()
    this.blogService.getItemById(this.blogId).subscribe(
      (result) => {
        this.currentBlog = new BlogModel(result);
        console.log('got blog: ' + this.currentBlog);
      },
      (error) => {
        console.error(error);
      }
    );

    console.log('reload done');
  }

  public update() {
    console.log('starting update');
    this.errorMessage = '';

    if (this.currentBlog?.title?.trim() == '') {
      this.errorMessage = 'Title is Required';
      return;
    }

    if (this.currentBlog?.text?.trim() == '') {
      this.errorMessage = 'Text is Required';
      return;
    }

    this.currentBlog.dateModified = new Date(); // Update the dateModified field before posting

    this.blogService.updateBlog(this.blogId, <BlogModel>this.currentBlog).subscribe(
      (result) => {
        this._router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.errorMessage = 'Permission denied.';
        } else {
          this.errorMessage = 'Missing Required Information.';
        }
        console.error(error);
      }
    );
  }
  public goBack() {
    this._router.navigate(['/blog', this.blogId]);
  }
}
