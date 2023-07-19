import { Component, OnInit } from '@angular/core';
import { Credentials, CredentialsService } from './Core/auth/credentials.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:CredentialsService,private cookieService:CookieService){
      
    }
  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      const token: any = this.cookieService.get('credentials')
      //sessionStorage?.getItem('credentials');
      const credentials: Credentials =(token)? JSON.parse(token):null;
      let expdate:any  = new Date(credentials?.expirydate);
      console.log(expdate)
      this.auth.autologOut(expdate);
    }
  }
  title = 'todo-ui';
}
