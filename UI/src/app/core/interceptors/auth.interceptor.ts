import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
//import { EncryptionService } from '../services/encryption.service';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        /*
        * The verbose way:
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        */
        // Clone the request and set the new header in one step.
        const authReq = this.requestOptions(req);
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }

    private requestOptions(req: HttpRequest<any>) {
        const authReq = req.clone({
            setHeaders: {
                authToken: this._authService.getAuthToken(),
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin':'*'
            }
        });
        return authReq;
    }
    /**
     * Defined for advanced tokenization mechanism.
     * @param token 
     * @param uuid 
     */
    private getAuthorizationHeader(token: string, uuid: string): string {
        const data = uuid + '||' + token;
        //return EncryptionService.encryptText(data);
        return data;
    }
}
