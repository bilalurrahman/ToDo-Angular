import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './Models/register-user.model';
import { Observable, map } from 'rxjs';
import { Login } from './Models/login-user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials, CredentialsService } from '../Core/auth/credentials.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,POST,DELETE,PUT'
  })
};
const jwtHelperService = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private credentialsService: CredentialsService,private http:HttpClient) { }

  registerUserService(model:Register):Observable<void>
  {
    return this.http.post<void>(environment.apiUrl+'Register',model,httpOptions) //make the base url dynamic
  }
  loginUserService(model:Login):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'Login',model,httpOptions).pipe(map((res) => this.saveUserCredentials(res)));
  }


  private saveUserCredentials(res: any): Observable<object> {
    
    const decodedToken = jwtHelperService.decodeToken(res?.token);

    const credential: Credentials = {
      username: decodedToken?.Name,
      expirydate:res?.refreshTokenExpiry,
      payloads: decodedToken,
      token: res?.token,
      roles: [],
    };
    // if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] instanceof Array) {
    //   credential.roles =this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    // } else {
    //   credential.roles=this.roles = [decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']];
    // }
    this.credentialsService.setCredentials(credential, false);
    return res;
  }
}
