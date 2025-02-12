import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home.component';
import { SignupComponent } from './components/pages/sign-up.component';
import { SigninComponent } from './components/pages/sign-in.component';
import { PostComponent } from './components/pages/post.component';
import { AccountComponent } from './components/pages/account.component';
import { BlogComponent } from './components/pages/blog.component';
import { NavbarComponent } from './components/controls/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from './services/session-service';
import { EditBlogComponent } from './components/pages/edit-blog.component';
import { EditAccountComponent } from './components/pages/edit-account.component';
import { UploadImageComponent } from './components/pages/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    AccountComponent,
   PostComponent,
    BlogComponent,
    NavbarComponent,
    EditBlogComponent,
    EditAccountComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    EditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'sign-in', component: SigninComponent },
      { path: 'account/:id', component: AccountComponent },
      { path: 'post/:id', component: PostComponent },
      { path: 'blog/:id', component: BlogComponent },
      { path: 'edit-blog/:id/:uid', component: EditBlogComponent },
      { path: 'edit-account/:id', component: EditAccountComponent },
      { path: 'upload-image/:id/:uid', component: UploadImageComponent },
    ]),
    NgbModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
