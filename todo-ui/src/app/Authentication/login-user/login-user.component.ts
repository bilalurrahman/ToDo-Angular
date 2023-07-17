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
  showToast: boolean = false;
  error: string = "Some Error Occurs"
  isLoading:Boolean = false;

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
  closeToast(): void {
    this.showToast = false;
  }
  onFormSubmit() {
    
    const fieldsNotEmpty = Object.values(this.model).every(field => field !== '');
    if (fieldsNotEmpty) {
      this.isLoading =true;
      this.authService.loginUserService(this.model)
        .subscribe({
          next: (response) => {
            //auto logout time 
            console.log(response);
            var expdate:any = new Date(response?.refreshTokenExpiry);
            var datetimenow:any = new Date();
            this.credentialsService.autologOut(expdate);
            this.router.navigate(['']);
          },
          error: (response) => {
            this.isLoading = false;
            console.log(response);
            this.error = response?.error?.ErrorMessage;
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
    this.showToast = true;
  }

}
