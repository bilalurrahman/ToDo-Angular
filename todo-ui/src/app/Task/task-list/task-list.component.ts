import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  lists:any;
  constructor(private taskservice:TaskServiceService){}
  ngOnInit(): void {
    this.taskservice.getAllTasks()
    .subscribe({
      next: (response) => {
        console.log(response)
        this.lists = response;
      },
      error: (response) => {
        console.log(response)
      }
    })
  }

}
