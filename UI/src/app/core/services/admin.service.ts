import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseModel } from '../../models/response.interface';
import { UsersModel } from '../../models/users.interface';
import { UpdateUserModel } from '../../models/updateuser.interface';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiBaseUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) {
    }

    updateUser(userModel: UpdateUserModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(`${this.apiBaseUrl}auth/updateuser`, userModel);
    }
    getUsers(): Observable<UsersModel[]> {
        return this.httpClient.get<UsersModel[]>(`${this.apiBaseUrl}auth`);
    }
}