import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../core/services/post.service'
import { PostResponseModel} from '../../models/post-response.interface';
import { AuthService } from '../../core/services/auth.service';
import { EventBrokerService } from '../../core/services/event-broker.service';

@Component({
    selector: 'posts',
    templateUrl: '../templates/views/posts.component.html',
    styleUrls: ['../templates/less/posts.component.less'],
})
export class PostsComponent implements OnInit{
    error: string;
    posts: PostResponseModel[];
    constructor(private _router: Router,
        private _postService: PostService,        
        private _authService: AuthService,
        private _eventBrokerService: EventBrokerService) {

    }
    ngOnInit() {   
       // debugger;    
       this.getposts();   
       this._eventBrokerService.register('postData');
    }
    getposts() {
        this._postService.getPosts().subscribe(data=>{
            if(data!=null){
               // debugger;
                this.posts=data;
            }
            else {
                this.error = '';
            }
        });
    }
    naviagateToHome() {
        this._router.navigateByUrl('home');
    } 
    naviagateToPost(id) {
        this._router.navigateByUrl('home/posts/'+id); 
    }   
    deletePost(postId:number){
        this._postService.deletePost(postId).subscribe(x=>{
            if (x.statusCode==200) {
                alert(x.errorMessage);
                this.getposts();
            }
        });
    }
    isUserLoggedIn() {
        return this._authService.isUserLoggedIn() ? true : false;
      }
    addComments(post:PostResponseModel){
        //this._authService.setPostInfo(post);
        //this._eventBrokerService.publish('postData',post);
        this.naviagateToPost(post.id);
    }
}