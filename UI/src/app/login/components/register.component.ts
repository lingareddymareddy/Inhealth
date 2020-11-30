import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service'
import { RegisterModel } from '../../models/register.interface';

@Component({
    selector: 'register', 
    templateUrl: '../templates/views/register.component.html',
})

export class RegisterComponent implements OnInit {

    error: string;
    isLoading: boolean;
    registerForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _router: Router,
        private _loginService: LoginService) {
        this.buildRegisterForm();
    }
    naviagateToHome() {
        this._router.navigateByUrl('home');
    }
    ngOnInit() {
        console.log('Loading Register component');
        //this._eventBrokerService.publish(Constants.Events.Logout);
    }
/**
 * Authenticate User with provided credentials
 * @param registerModel 
 * @param isValid 
 */
    register(registerModel: RegisterModel, isValid) {
        console.log(registerModel);
        registerModel.id=0;
        this._loginService.registerUser(registerModel).subscribe(x => {
            if (x.statusCode==200) {
                alert(x.errorMessage);
                this.naviagateToHome() 
            }
            else {
                this.error = x.errorMessage;
            }
        });
    }

    displayRegisterFailure() {
        return this.error ? true : false;
    }

    private buildRegisterForm() {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
