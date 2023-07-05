import { Injectable } from '@angular/core';
import { CredentialsService } from '../Core/auth/credentials.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private credentialsService: CredentialsService,private http:HttpClient) { }
  baseUrl:string = 'http://localhost:5710'
  
  getAllTasks():Observable<any>
  {
    const headers = this.credentialsService.getHeaders();
    console.log(headers);
    return this.http.get(this.baseUrl+"/Tasks/GetAll",headers) //make the base url dynamic
  }
}
