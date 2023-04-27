import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../../models/blog-model';
import { BlogService } from '../../services/blog-service';
import { SessionService } from '../../services/session-service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { BlogTypeModel } from '../../models/blog-type-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlogBlogTypeModel } from '../../models/blog-blog-type-model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [SessionService, BlogService],
})
export class PostComponent {
  public userId = 0;
  public blog?: BlogModel;
  public errorMessage = '';
  public blogId = 0;
  dropdownList: BlogTypeModel[] = [];
  dropdownSettings: IDropdownSettings = {};
  public selectedBlogTypes: BlogTypeModel[] = [];
  dropDownForm!: FormGroup;

  public constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private sessionService: SessionService,
    private blogService: BlogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.userId = parseInt(<string>id);
    console.log('got user id: ', this.userId);

    this.dropDownForm = this.fb.group({
      myItems: [this.selectedBlogTypes]
    });

    this.reload();
  }

  public reload() {
    console.log('reload');

    this.blog = new BlogModel();

    this.blogService.getBlogTypes().subscribe(
      result => {
        this.dropdownList = result.map(x => new BlogTypeModel(x));
      },
      error => {
        console.log(error);
      }
    )

    this.dropdownSettings = {
      idField: 'blogTypeId',
      textField: 'name',
      allowSearchFilter: true,
      enableCheckAll: false,
    };

    console.log('reload done');
  }

  public onItemSelect(item: any) {
    this.selectedBlogTypes.push(item);
    console.log('onItemSelect', this.selectedBlogTypes);
  }

  public onItemDeSelect(item: any) {
    this.selectedBlogTypes = this.selectedBlogTypes.filter(x => x.blogTypeId !== item.blogTypeId);
    console.log('onItemDeSelect', this.selectedBlogTypes);
  }

  public post() {
    console.log('posting started');

    let postBlog = new BlogModel();
    postBlog.userId = this.userId;

    this.errorMessage = '';
    if (this.blog?.title?.trim() == '') {
      this.errorMessage = 'A Title is Required';
      return;
    }
    else {
      postBlog.title = this.blog?.title;
    }
    this.errorMessage = '';
    if (this.blog?.text?.trim() == '') {
      this.errorMessage = 'A text body is Required';
      return;
    }
    else {
      postBlog.text = this.blog?.text;
    }

    this.errorMessage = '';
    if (this.selectedBlogTypes.length == 0) {
      this.errorMessage = 'Please select a Genre for the blog.'
    }
    else {
      postBlog.blogBlogTypes = this.selectedBlogTypes.map(x => {
        let o = new BlogBlogTypeModel();
        o.blogTypeId = x.blogTypeId;
        return o;
      });
    }

    console.log(postBlog.blogBlogTypes);
    console.log(postBlog);

    this.blogService.post(< BlogModel > postBlog).subscribe(
      (result) => {
        this.blogId = result.blogId;
        this._router.navigate(['/upload-image', this.blogId]);
      },
      (error) => {
        this.errorMessage = 'Missing Required Information.';
        console.error(error);
      }
    );
  }
}
