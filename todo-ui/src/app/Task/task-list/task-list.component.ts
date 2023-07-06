import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  lists:any;
  isLoading:boolean = true;
  constructor(private taskservice:TaskServiceService){}
  ngOnInit(): void {
    this.taskservice.getAllTasks()
    .subscribe({
      next: (response) => {
        this.isLoading = false
        this.lists = response;
      },
      error: (response) => {
        this.isLoading = false
        console.log(response)
      }
    })
  }

}
