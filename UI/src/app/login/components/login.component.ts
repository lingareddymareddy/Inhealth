import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CacheService } from '../../core/services/cache.service';
import { LoginService } from '../../core/services/login.service'
//import { EventBrokerService } from '../core/services/event-broker.service';
import * as GlobalConstants from '../../core/constants/global.constant';
import { LoginResponseModel } from '../../models/login-response.interface';
import { LoginModel } from '../../models/login.interface';
import { UserModel } from '../../models/user.interface';

@Component({
    selector: 'login',
    templateUrl: '../templates/views/login.component.html',
})

export class LoginComponent implements OnInit {
    error: string;
    isLoading: boolean;
    loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService, 
        private _cacheService: CacheService,
        //private _eventBrokerService: EventBrokerService,
        private _loginService: LoginService) {
        this.buildLoginForm();
    }
    naviagateToHome() {
        location.href="home";
        this._router.navigateByUrl('home');
    }
    ngOnInit() {
        console.log('Loading login component');
        //this._eventBrokerService.publish(Constants.Events.Logout);
    }
/**
 * Authenticate User with provided credentials
 * @param loginModel 
 * @param isValid 
 */
    login(loginModel: LoginModel, isValid) {
        //console.log(loginModel, {});
        this._loginService.authenticateUser(loginModel).subscribe(x => {
            if (x!=null && x.authToken) {
                let userModel = this.constructUserModel(x);
                console.log(userModel);
                this._authService.setUserInfo(userModel);
                this._authService.setAuthToken(x.authToken);
                this.naviagateToHome();
            }
            else {
                this.error=GlobalConstants.UserMessage.InvalidLogin;
            }
        });
    }
    constructUserModel(loginResponseModel: LoginResponseModel) {
        let userDetails: UserModel = {
            //emailId: loginResponseModel.emailId,
            id: loginResponseModel.id,
            userName: loginResponseModel.userName,
            isAdmin:loginResponseModel.isAdmin
        }
        return userDetails;
    }

    displayLoginFailure() {
        return this.error ? true : false;
    }

    private buildLoginForm() {
        this.loginForm = this._formBuilder.group({
            loginId: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
