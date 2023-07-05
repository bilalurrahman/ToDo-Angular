import { Component, OnInit } from '@angular/core';
import { Login } from '../Models/login-user.model';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/Core/auth/credentials.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {


  model: Login;

  dynamicClass!: string;
  dynamicClass_username!: string;
  showAlert: boolean = false;
  error: string = "Some Error Occurs"

  constructor(private authService: AuthenticationServiceService,
    private router: Router,private credentialsService: CredentialsService) {
    this.model = {
      password: '',
      username: ''
    }
    this.dynamicClass = 'form-control'
    this.dynamicClass_username ='form-control'
  }
  ngOnInit(): void {
    if (this.credentialsService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }
  onFormSubmit() {
    const fieldsNotEmpty = Object.values(this.model).every(field => field !== '');
    if (fieldsNotEmpty) {

      this.authService.loginUserService(this.model)
        .subscribe({
          next: (response) => {
            this.router.navigate(['']);
          },
          error: (response) => {
            this.error = response.error.ErrorMessage;
            this.showBootstrapAlert();
          }
        })
    }
    else
      this.Validate();
  }


  Validate() {
    if (this.model.password == '')
      this.dynamicClass = 'form-control is-invalid'
    else this.dynamicClass = 'form-control is-valid'

    if (this.model.username == '')
      this.dynamicClass_username = 'form-control is-invalid'
    else this.dynamicClass_username = 'form-control is-valid'
  }


  showBootstrapAlert() {
    this.showAlert = true;
  }

  // Method to hide the alert
  hideBootstrapAlert() {
    this.showAlert = false;
  }
}
