import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CacheService } from '../../core/services/cache.service';
import { PostService } from '../../core/services/post.service'
import { PostModel} from '../../models/post.interface';
import { AuthService } from '../../core/services/auth.service';
import * as GlobalConstants from '../../core/constants/global.constant';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'post-add',
    templateUrl: '../templates/views/add.component.html',
    styleUrls: ['../templates/less/add.component.less'],
})

export class AddComponent implements OnInit {
    error: string;
    isLoading: boolean;
    addpostForm: FormGroup;
    description = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
    constructor(private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService, 
        private _cacheService: CacheService,
        private _postService: PostService) {
        this.buildaddpostForm();
    }
    naviagateToHome() {
        this._router.navigateByUrl('home');
    }
    ngOnInit() {
        console.log('Loading Add Post component');
    }
/**
 * @param postModel 
 * @param isValid 
 */
    addpost(postModel: PostModel, isValid) {
        debugger;
        let loginuserid=(this._authService.getLoggedInUserId());
        if(loginuserid>0){
            //postModel.description=content;
            postModel.id=0;
            postModel.createdby=loginuserid;
            this._postService.createPost(postModel).subscribe(x => {
        if (x.statusCode==200) {
            alert(x.errorMessage);
            this.naviagateToHome() 
        }
        else {
            this.error = x.errorMessage;
        }
        });
    } else{alert(GlobalConstants.UserMessage.SessionExpired)}  
}

    displayAddPostFailure() {
        return this.error ? true : false;
    }
    isUserLoggedIn() {
      return this._authService.isUserLoggedIn() ? true : false;
    }

    private buildaddpostForm() {
        this.addpostForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
    }
}
