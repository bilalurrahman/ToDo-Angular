import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './Authentication/login-user/login-user.component';
import { RegisterUserComponent } from './Authentication/register-user/register-user.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { AuthGuard } from './Core/auth/authentication.guard';


const routes: Routes = [
  {
    path:'',
    component:TaskListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'login',
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
