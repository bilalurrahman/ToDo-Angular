import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export interface Credentials {
  // Customize received credentials here
  username: string;
  expirydate: string;
  payloads: any;
  token: string;
  roles: string[];
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {

  
  private _credentials: Credentials | null = null;

  constructor(private router:Router,private cookieService:CookieService) {
    const savedCredentials = this.cookieService.get(credentialsKey)
    //sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      //const storage = remember ? localStorage : sessionStorage;
      //storage.setItem(credentialsKey, JSON.stringify(credentials));

      this.cookieService.set(credentialsKey,JSON.stringify(credentials),
      undefined,'/',undefined,true,'Strict')

    } else {

      this.cookieService.delete('testcookie')
     // sessionStorage.removeItem(credentialsKey);
      //localStorage.removeItem(credentialsKey);
    }
  }

  getHeaders() {
    const headers = new HttpHeaders();
    const token: any = sessionStorage?.getItem('credentials');
    const credentials: Credentials = JSON.parse(token);
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,POST,DELETE,PUT'
      })
    };
    if (credentials && credentials.token) {
      httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET,POST,DELETE,PUT',
          'Authorization': 'Bearer ' + credentials.token
        })
      };
    }
    console.log(httpOptions);
    return httpOptions;
  }


  autologOut(expirationDate:number){
    console.log(expirationDate);
    let nowDate:any = new Date();
    console.log(nowDate);
    expirationDate = expirationDate-nowDate;
    console.log("difference:"+ expirationDate);
    setTimeout(() => {
      this.setCredentials();
      sessionStorage.clear();
      localStorage.clear();     
      this.cookieService.delete(credentialsKey);
      this.router.navigate(['/login']);
    }, expirationDate);

  }
}
