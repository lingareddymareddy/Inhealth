import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../../models/login.interface';
import { LoginResponseModel} from '../../models/login-response.interface';
import { RegisterModel } from '../../models/register.interface';
import { ResponseModel } from '../../models/response.interface';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiBaseUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) {
    }
    authenticateUser(loginModel: LoginModel): Observable<LoginResponseModel> {
        return this.httpClient.post<LoginResponseModel>(`${this.apiBaseUrl}auth/Login`, loginModel);
    }
    registerUser(registerModel: RegisterModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(`${this.apiBaseUrl}auth/Register`, registerModel);
    }
}