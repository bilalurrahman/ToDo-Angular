import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './Models/register-user.model';
import { Observable } from 'rxjs';
import { Login } from './Models/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http:HttpClient) { }

  registerUserService(model:Register):Observable<void>
  {
    return this.http.post<void>('http://localhost:5800/User/Register',model) //make the base url dynamic
  }
  loginUserService(model:Login):Observable<any>{
    return this.http.post<any>('http://localhost:5800/User/Login',model)
  }
}
