import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Devices } from './device.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceCreationService {

  constructor(private http:HttpClient) { }


  createDevice(model:Devices):Observable<any>
  {
      return this.http.post<any>(environment.apiUrl+"UserDevice",model)
  }
}
