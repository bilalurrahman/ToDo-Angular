import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CredentialsService } from 'src/app/Core/auth/credentials.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private credentialsService: CredentialsService,private cookieService:CookieService, 
    public router: Router){}
  
  logout() {
    this.credentialsService.setCredentials();
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.delete('credentials');
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return this.credentialsService.isAuthenticated();
  }
}
