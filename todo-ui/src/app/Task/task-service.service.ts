import { Injectable } from '@angular/core';
import { CredentialsService } from '../Core/auth/credentials.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private credentialsService: CredentialsService,private http:HttpClient) { }
  
  
  getAllTasks():Observable<any>
  {
    const headers = this.credentialsService.getHeaders();
    console.log(headers);
    return this.http.get(environment.apiUrl+"Tasks/GetAll",headers) //make the base url dynamic
  }
}
