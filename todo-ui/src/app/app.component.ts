import { Component, OnInit } from '@angular/core';
import { Credentials, CredentialsService } from './Core/auth/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:CredentialsService){}
  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      const token: any = sessionStorage?.getItem('credentials');
      const credentials: Credentials = JSON.parse(token);
      let expdate:any  = new Date(credentials?.expirydate);
      console.log(expdate)
      this.auth.autologOut(expdate);
    }
  }
  title = 'todo-ui';
}
