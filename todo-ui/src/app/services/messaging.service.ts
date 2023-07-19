import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Devices } from './device.model';
import { DeviceCreationService } from './device-creation.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);
  DeviceModel : Devices

  constructor(private angularFireMessaging: AngularFireMessaging
    ,private deviceService:DeviceCreationService) {
    this.DeviceModel ={
      device_token :''
    }
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log(token)
      this.createDeviceService(token)
    }, (err) => {
      console.log("unable to get permission", err)
    });
  }
  receiveMessage(){
    this.angularFireMessaging.messages.subscribe((payload)=>{
      console.log("new message received",payload)
      this.currentMessage.next(payload)
    })
  }

  createDeviceService(token:string | null){
    this.DeviceModel={
      device_token : token
    }
    this.deviceService.createDevice(this.DeviceModel)
    .subscribe({
      next: (response) => {
       console.log(response)
      },
      error: (response) => {                
        console.log(response)
      }
    })
  }

}
