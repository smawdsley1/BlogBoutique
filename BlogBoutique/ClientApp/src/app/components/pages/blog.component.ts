import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlogModel } from '../../models/blog-model';
import { CommentModel } from '../../models/comment-model';
import { PhotoModel } from '../../models/photo-model';
import { BlogService } from '../../services/blog-service';
import { CommentService } from '../../services/comment-service';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-post',
  templateUrl: './blog.component.html',
  providers: [BlogService, CommentService],
  styleUrls: ['./blog.component.sass']

})
export class BlogComponent implements OnInit {
  

  isExpanded = false;
  private dialog: NgbModalRef | undefined = undefined;
  public item: BlogModel | undefined;
  public image: PhotoModel | undefined;
  private blogId = 0;
  public comments: CommentModel[] = [];
  public errorMessage = '';
  public comment = new CommentModel;
  public isLoggedIn = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private modalService: NgbModal,
    private sessionService: SessionService,
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

    console.log(this.sessionService.userId);
    
    this.blogService.getItemById(this.blogId).subscribe(
      result => {
        this.item = new BlogModel(result);
        console.log('got blog: ' + this.item);
      },
      error => {
        console.error(error);
      }
    );

    this.blogService.getImageById(this.blogId).subscribe(
      result => {
        this.image = new PhotoModel(result);
        console.log('got image: ' + this.item);
      },
      error => {
        console.error(error);
      }
    );

    this.commentService.getCommentsById(this.blogId).subscribe(
      result => {
        this.comments = result.map(x => new CommentModel(x));
        console.log('got comments; ' + this.comments);
      },
      error => {
        console.log(error);
      }
    );

    console.log('reload done');
  }

  public goBack() {
    this._router.navigate(['/home']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  open(content: any) {
    this.dialog = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  cancel() {
    this.dialog?.close();
  }

  save() {
    this.errorMessage = '';
    if (this.sessionService.isLoggedIn() == false) {
      this.errorMessage = "You must be logged in to Comment";
      return;
    }

    this.errorMessage = '';
    if (this.comment?.text?.trim() == '') {
      this.errorMessage = "Text is Required";
      return;
    }

    this.comment.blogId = this.blogId;
    this.comment.userId = this.sessionService.userId;

    this.commentService.post(<CommentModel>this.comment).subscribe(
      result => {
        this.dialog?.close();
        this._router.navigate(['/blog', this.blogId]);
        this.reload();
      },
      error => {
        console.log(error);
      }

    );
  }

  getDaysAgo(dateCreated: Date | string | undefined) {
    if (dateCreated instanceof Date) {
      dateCreated = dateCreated.toISOString(); // convert to string in ISO format
    }

    if (typeof dateCreated === 'string') {
      dateCreated = new Date(dateCreated); // convert string to Date object
    }

    if (dateCreated != undefined && !isNaN(dateCreated.getTime())) {
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        return `${diffDays} days ago`;
      }
      else {
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        return `${diffHours} hours ago`;
      }
    }
    return;
  }



}
