import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts.component';
import { PostComponent } from './components/post.component';
import { AddComponent } from './components/add.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: '/home/posts',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        children: [
            {
                path: 'newpost',
                component: AddComponent
            },
            {
                path: '',
                component: PostsComponent
            },
            {
                path:':id',
                component:PostComponent
            },
           
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule { }
