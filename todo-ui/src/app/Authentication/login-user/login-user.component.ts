import { Component } from '@angular/core';
import { Login } from '../Models/login-user.model';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {


  model: Login;

  dynamicClass!: string;
  dynamicClass_username!: string;
  showAlert: boolean = false;
  error: string = "Some Error Occurs"

  constructor(private authService: AuthenticationServiceService) {
    this.model = {
      password: '',
      username: ''
    }
    this.dynamicClass = 'form-control'
    this.dynamicClass_username ='form-control'
  }
  onFormSubmit() {
    const fieldsNotEmpty = Object.values(this.model).every(field => field !== '');
    if (fieldsNotEmpty) {

      this.authService.loginUserService(this.model)
        .subscribe({
          next: (response) => {
            console.log(response);
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
