import { Injectable } from '@angular/core';
import { CredentialsService } from '../Core/auth/credentials.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TasksEntity } from './Models/task-list.model';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  headers:any
  constructor(private credentialsService: CredentialsService,private http:HttpClient) { 
    this.headers = this.credentialsService.getHeaders();
  }
  
  
  getAllTasks():Observable<TasksEntity[]>
  {
    const headers = this.credentialsService.getHeaders();
    return this.http.get<TasksEntity[]>(environment.apiUrl+"Tasks/GetAll",headers) //make the base url dynamic
  }

  createTask(model:TasksEntity):Observable<any>
  {
      return this.http.post<any>(environment.apiUrl+"Tasks/",model,this.headers) //make the base url dynamic
  }

  deleteTasks(id:string):Observable<any>
  {
    return this.http.delete<any>(environment.apiUrl+`Tasks/${id}`,this.headers) //make the base url dynamic
  }

}
