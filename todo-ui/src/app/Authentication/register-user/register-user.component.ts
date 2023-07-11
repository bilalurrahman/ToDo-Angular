import { Component, OnInit } from '@angular/core';
import { Register } from '../Models/register-user.model';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/Core/auth/credentials.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  model:Register;
  dynamicClass!:string;
  dynamicClass_username!:string;
  showToast: boolean = false;
  error:string = "Some Error Occurs"

  constructor(private authService:AuthenticationServiceService
    ,private router: Router,private credentialsService: CredentialsService){
    this.model ={
      password:'',
      username:''
    }
    this.dynamicClass = 'form-control'
    this.dynamicClass_username ='form-control'
  }

  ngOnInit(): void {
    if (this.credentialsService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }


  onFormSubmit(){
    const fieldsNotEmpty = Object.values(this.model).every(field => field !== '');
    if(fieldsNotEmpty){
    
    this.authService.registerUserService(this.model)
    .subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigate(['']);
        //make the redirection here
      },
      error:(response)=>{
        this.error = response.error.ErrorMessage;
        this.showBootstrapAlert();
      }
    })
    }
    else{
      this.Validate();      
    }
  }


  Validate(){
    if(this.model.password=='')
        this.dynamicClass = 'form-control is-invalid'
    else this.dynamicClass = 'form-control is-valid'

    if(this.model.username=='')
        this.dynamicClass_username = 'form-control is-invalid'
    else this.dynamicClass_username = 'form-control is-valid'
  }


  showBootstrapAlert() {
    this.showToast = true;
  }

  // Method to hide the alert
  closeToast(): void {
    this.showToast = false;
  }

}
