import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as GlobalConstants from '../core/constants/global.constant';
import { CacheService } from '../core/services/cache.service';
import { EventBrokerService } from '../core/services/event-broker.service';
import { AuthService } from '../core/services/auth.service';
import { Constants } from '../core/constants/cachekey.constant';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
   
    displayUserActionPane = false;
    logoPath = '';
    loginUserName='';
    isAdminUser = false;
    constructor(private _authService: AuthService,
        private _cacheService: CacheService,
        private _eventBrokerService: EventBrokerService,
        private _router: Router) {

    }
    ngOnInit(): void {
        this.setImagePath();
        this.subscribeToLogout();
        this.setUserActionPanelDisplayMode();
        this.getLoggedInUserName();
        this.checkisAdminUser();
    }
    subscribeToLogout() {
        this._eventBrokerService.subscribe(Constants.Events.Logout).subscribe(res => {
            this._authService.logout();
            this.setUserActionPanelDisplayMode();
        });
    }
    setUserActionPanelDisplayMode(): void {
        //debugger;
        this.displayUserActionPane = this._authService.isUserLoggedIn() ? true : false;
    }
    setImagePath(): void {
        this.logoPath=(environment.production === true ? 'img/logo.png' : 'assets/image/logo.png')
     }
     naviagateToAdmin() {
        this._router.navigateByUrl('admin/users');
    } 
     naviagateToLogin() {
        this._router.navigateByUrl('auth/login');
    }
    naviagateToRegister() {
        this._router.navigateByUrl('auth/register');
    }
    naviagateToHome() {
        this._router.navigateByUrl('home');
    }
    naviagateToNewPost() {
        this._router.navigateByUrl('home/posts/newpost');
    }
    getLoggedInUserName(){
        this.loginUserName=this._authService.getLoggedInUserName();
    }
    checkisAdminUser(){
        this.isAdminUser=this._authService.isAdminUser()?true:false;
    }
    logout() {
        if(confirm(GlobalConstants.UserMessage.LogoutConfirm)){
        this._eventBrokerService.publish(Constants.Events.Logout);
        this.displayUserActionPane = false;
        this._authService.logout();
        this.naviagateToHome();
        }
    }
}