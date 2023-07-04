import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './Authentication/register-user/register-user.component';
import { LoginUserComponent } from './Authentication/login-user/login-user.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreateComponent } from './Task/task-create/task-create.component';
import { TaskUpdateComponent } from './Task/task-update/task-update.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    NavBarComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
