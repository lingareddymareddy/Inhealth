import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {CommentResponseModel} from '../../models/comment-response.interface';
import {CommentRequestModel} from '../../models/comment.interface';
import { ResponseModel } from '../../models/response.interface';


@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiBaseUrl = environment.apiUrl+'PostComments/';
    constructor(private httpClient: HttpClient) {
    }

    getcomments(postId:number): Observable<CommentResponseModel[]> {
        return this.httpClient.get<CommentResponseModel[]>(`${this.apiBaseUrl}getpostcomments?postid=`+postId);
    }
    postcomments(commentModel:CommentRequestModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(`${this.apiBaseUrl}add`, commentModel);
    }
}