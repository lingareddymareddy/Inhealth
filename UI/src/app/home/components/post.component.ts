import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { PostService } from '../../core/services/post.service'
import {PostResponseModel} from '../../models/post-response.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'post',
    templateUrl: '../templates/views/post.component.html',
    styleUrls: ['../templates/less/post.component.less'],
})
export class PostComponent {
    error: string;
    post: PostResponseModel;
    constructor(private _router: Router,private _activetedRouter: ActivatedRoute,
        private _postService: PostService,        
        private _authService: AuthService) {
    }
    ngOnInit() { 
        this._activetedRouter.params.subscribe(params => {          
        this.getpost(params['id']);          
        });
              
    }
    getpost(postId) {  
        console.log(postId+' value from url')
        if(postId!=null && postId>0)   {      
        this._postService.getPost(postId).subscribe(data=>{
            if(data!=null){
                this.post=data;
                this._authService.setPostInfo(data);
            }
            else {
                this.error = '';
            }
        });  
        }else{this.naviagateToHome();}
    }
    naviagateToHome() {
        this._router.navigateByUrl('home');
    }
    deletePost(postId:number){
        this._postService.deletePost(postId).subscribe(x=>{
            if (x.statusCode==200) {
                alert(x.errorMessage);
                this.naviagateToHome() 
            }
        });
    }
    isUserLoggedIn() {
        return this._authService.isUserLoggedIn() ? true : false;
      }
    addComments(postId:number){
        alert(postId);
    }
}