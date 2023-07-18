import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './Authentication/register-user/register-user.component';
import { LoginUserComponent } from './Authentication/login-user/login-user.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { TaskCreateComponent } from './Task/task-create/task-create.component';
import { TaskUpdateComponent } from './Task/task-update/task-update.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoaderShimmerComponent } from './Layout/shared/loader-shimmer/loader-shimmer.component';
import { SimpleLoaderComponent } from './Layout/shared/simple-loader/simple-loader.component';
import { DatePipe } from '@angular/common';
import { ToastPopupComponent } from './Layout/shared/toast-popup/toast-popup/toast-popup.component';
import { HeaderInterceptor } from './Core/header.interceptor';
import { TimerPopupComponent } from './Task/pomodoros/timer-popup/timer-popup.component';
import { TimerFormatPipe } from './Task/pomodoros/timer-format.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';




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
    ToastPopupComponent,
    TimerPopupComponent,   
    TimerFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
