import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './Authentication/login-user/login-user.component';
import { RegisterUserComponent } from './Authentication/register-user/register-user.component';

const routes: Routes = [
  {
    path:'',
    component:LoginUserComponent
  },
  {
    path:'register',
    component:RegisterUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
