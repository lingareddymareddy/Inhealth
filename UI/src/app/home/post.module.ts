import { NgModule } from "@angular/core";
import { PostsComponent } from "./components/posts.component";
import { PostComponent } from "./components/post.component";
import { AddComponent } from "./components/add.component";
import { CommentComponent } from "./components/comment.component";
import { AddCommentComponent } from "./components/addcomment.component";
import { PostRoutingModule } from "./post.routing";
import { SharedModule } from '../shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    declarations: [PostsComponent,PostComponent,AddComponent,CommentComponent,AddCommentComponent],
    imports: [
        PostRoutingModule,
        SharedModule,AngularEditorModule
    ],
    //entryComponents: [PostComponent,CommentComponent,AddCommentComponent] 
})
export class PostModule {

}