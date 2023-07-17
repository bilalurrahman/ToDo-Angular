import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Credentials } from './auth/credentials.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private cookieService:CookieService ){}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token: any = this.cookieService.get('credentials')
    //sessionStorage?.getItem('credentials');
    console.warn(token)
    const credentials: Credentials = (token)?JSON.parse(token):null;

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer '+ credentials?.token)
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
      
    const modifiedRequest = request.clone({
      headers: headers
    });

    return next.handle(modifiedRequest);
  }
}
