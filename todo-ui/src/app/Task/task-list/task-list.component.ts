import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { TasksEntity } from '../Models/task-list.model';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @ViewChild(TaskCreateComponent) childComponent!: TaskCreateComponent;

  lists:TasksEntity[]; 
  isLoading:boolean = true;
  resetForm: boolean = false;
  constructor(private taskservice:TaskServiceService,
    private datepipe:DatePipe){
    this.lists = [];   
  }
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

  createTask(task: TasksEntity){
    const fieldsNotEmpty = task.title !== '' && task.title !=null;    
    if(fieldsNotEmpty){
      var date = this.datepipe.transform(new Date(),"yyyy-MM-dd")
      let newTask: TasksEntity = {
      id: '',
      createdBy: '',
      lastModifiedBy: '',
      createdDate: date?.toString(),
      lastModifiedDate: date?.toString(),
      isActive: true,
      userId: 0,
      isCompleted: false,
      isDeleted: false,
      title: task.title,
      description: '',
      status: 0,
      dueDate: date?.toString(),
      haveReminder: false,
      reminderDateTime: date?.toString(),
      isNotifiedForReminder: false,
      isPinned: false,
      isNotifiedForDue: false,
      subTasks: []
      }
      this.createTaskService(newTask);
           
      task.title='';
      this.childComponent.form.resetForm();

    }
  }
  itemToRemove: TasksEntity | null = null;
  deleteTask(item:TasksEntity){
    this.itemToRemove = item;
    setTimeout(() => {
      const index = this.lists.indexOf(item);
      if (index !== -1) {
        this.lists.splice(index, 1);
      }
    }, 500); 
  }

  createTaskService(item:TasksEntity){
    this.taskservice.createTask(item)
    .subscribe({
      next: (response) => {
        item.id=response.id;
        this.lists.unshift(item); 
        console.log(this.lists);        
      },
      error: (response) => {        
        console.log(response)
      }
    })
  }

  deleteTaskService(item:TasksEntity){
    this.taskservice.deleteTasks(item.id)
    .subscribe({
      next: (response) => {
        console.log(response);  
        this.deleteTask(item);     
      },
      error: (response) => {        
        console.log(response)
      }
    })
  }

}
