import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './Authentication/register-user/register-user.component';
import { LoginUserComponent } from './Authentication/login-user/login-user.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreateComponent } from './Task/task-create/task-create.component';
import { TaskUpdateComponent } from './Task/task-update/task-update.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoaderShimmerComponent } from './Layout/shared/loader-shimmer/loader-shimmer.component';
import { SimpleLoaderComponent } from './Layout/shared/simple-loader/simple-loader.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    NavBarComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    LoaderShimmerComponent,
    SimpleLoaderComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
