import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './upload-image.component.html',
})
export class UploadImageComponent {
  public imagePath: any;
  imgURL: any;
  public message: string = '';
  public blogId: number = 0;
  public userId: number = 0;
  public image: FormData = new FormData();
  @ViewChild('myForm') myForm: any;

  public constructor(private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    this.blogId = parseInt(<string>id);
    console.log('got blog id: ', this.blogId);

    let uId = this._route.snapshot.paramMap.get('uid');
    this.userId = parseInt(<string>uId);
    console.log('got user id: ', this.userId);
}


  preview(files: FileList | null) {
    if (files == null || files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  public uploadImage() {
    console.log('upload');
    let form = this.myForm.nativeElement;
    form.submit();
    this._router.navigate(['/account', this.userId]);
  }
}
