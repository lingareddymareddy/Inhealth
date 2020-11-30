import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentResponseModel } from 'src/app/models/comment-response.interface';
import { CommentService } from '../../core/services/comment.service'
import { AuthService } from '../../core/services/auth.service'

@Component({
    selector: 'post-comment',
    templateUrl: '../templates/views/comment.component.html'
})
export class CommentComponent implements OnInit{
    @Input() postId:number=1;
    error: string;
    comments:CommentResponseModel[];
    constructor(private _router: Router, private _commentService: CommentService,
         private _authService: AuthService) {

    }
      ngOnInit() {
        this.getcomments();       
     }
     getcomments() {   
        //this.postId=this._authService.getPostInfo().id;            
        this._commentService.getcomments(this.postId).subscribe(data=>{
            if(data!=null){
                this.comments=data;
            }
            else {
                this.error = '';
            }
         });  
     }
}