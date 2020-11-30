import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CacheService } from '../../core/services/cache.service';
import { EventBrokerService } from '../../core/services/event-broker.service';
import { Constants } from '../../core/constants/cachekey.constant';
import { CommentService } from '../../core/services/comment.service'
import { CommentRequestModel} from '../../models/comment.interface';


@Component({
    selector: 'post-comment-add',
    templateUrl: '../templates/views/addcomment.component.html'
})

export class AddCommentComponent implements OnInit {
    @Input() postId:number=1;
    error: string;
    isLoading: boolean;
    postaddCommentForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService, 
        private _cacheService: CacheService,
        private _eventBrokerService: EventBrokerService,
        private _commentService: CommentService) {
        this.buildpostaddCommentForm();
    }
    ngOnInit() {
        console.log('Loading Add Post component');
        this._eventBrokerService.publish(Constants.Events.Logout);
    }
    ngAfterViewInit() {}

    addpostcomment(commentModel: CommentRequestModel, isValid) {
    commentModel.createdBy=this._authService.getLoggedInUserId();
    commentModel.id=0;
    commentModel.postId=this.postId;
        this._commentService.postcomments(commentModel).subscribe(x => {
            if (x.statusCode==200) {
                alert(x.errorMessage);
                this.naviagateToHome() 
            } 
    });
    }
    naviagateToHome() {
        this._router.navigateByUrl('home');
    }
    displayAddPostCommentFailure() {
        return this.error ? true : false;
    }

    private buildpostaddCommentForm() {
        this.postaddCommentForm = this._formBuilder.group({
            comment: ['', Validators.required]
        });
    }
}
