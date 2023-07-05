
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

export function authGuard(router: Router, authService: CredentialsService): CanActivateFn {

  return () => {
    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };

}