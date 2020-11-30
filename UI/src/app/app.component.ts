import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { EventBrokerService } from './core/services/event-broker.service';
import { Constants } from './core/constants/cachekey.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'MyBlog';
  
  constructor(private _authService: AuthService, 
  private _eventBrokerService: EventBrokerService,
  private _router: Router) {
  }
  ngOnInit() {
  this._eventBrokerService.register(Constants.Events.Logout);
  if (this._authService.isUserLoggedIn()) {
    this.naviagateToHome();
  }
}
naviagateToHome() {
  this._router.navigateByUrl('home');
}
}
