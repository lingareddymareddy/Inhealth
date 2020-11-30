import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {PostModel} from '../../models/post.interface';
import {PostResponseModel} from '../../models/post-response.interface';
import { ResponseModel } from '../../models/response.interface';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiBaseUrl = environment.apiUrl+'posts/';
    constructor(private httpClient: HttpClient) {
    }

    getPosts(): Observable<PostResponseModel[]> {
        return this.httpClient.get<PostResponseModel[]>(`${this.apiBaseUrl}`);
    }
    getPost(postId:number): Observable<PostResponseModel> {
        return this.httpClient.get<PostResponseModel>(`${this.apiBaseUrl}`+postId);
    }
    createPost(postModel: PostModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(`${this.apiBaseUrl}add`, postModel);
    }
    deletePost(postId: number): Observable<ResponseModel> {
        return this.httpClient.delete<ResponseModel>(`${this.apiBaseUrl}`+postId);
    }
}