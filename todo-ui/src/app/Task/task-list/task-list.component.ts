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
  error: string = '';
  showToast: boolean = false;

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
  closeToast(): void {
    this.showToast = false;
  }
  createTask(task: TasksEntity){
    const fieldsNotEmpty = task.title !== '' && task.title !=null;    
    if(fieldsNotEmpty){
      var date = this.datepipe.transform(new Date(),"yyyy-MM-dd")
      var duedate = this.datepipe.transform(new Date(1970,1,1),"yyyy-MM-dd")
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
      dueDate: duedate?.toString(),
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
      this.childComponent.dynamicClass='form-control';
    } else{
      this.childComponent.Validate();
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
        this.error="Task Created Successfully";
        this.showToast=true;      
      },
      error: (response) => {        
        console.log(response);
        this.error=response;
        this.showToast=true; 
      }
    })
  }

  deleteTaskService(item:TasksEntity){
    this.taskservice.deleteTasks(item.id)
    .subscribe({
      next: (response) => {
        this.deleteTask(item);
        this.error="Task Deleted Successfully";
        this.showToast=true;  
      },
      error: (response) => {        
        console.log(response)
        this.error=response;
        this.showToast=true;
      }
    })
  }

  taskStatusToggle(item:TasksEntity){
   
    var date = this.datepipe.transform(new Date(),"yyyy-MM-dd")
      let updatedTask: TasksEntity = {
      id: item.id,
      createdBy: item.createdBy,
      lastModifiedBy: item.lastModifiedBy,
      createdDate: item.createdDate,
      lastModifiedDate: date?.toString(),
      isActive: item.isActive,
      userId: item.userId,
      isCompleted: (item.isCompleted)?false:true,
      isDeleted: false,
      title: item.title,
      description: item.description,
      status: item.status,
      dueDate: item.dueDate,
      haveReminder: item.haveReminder,
      reminderDateTime: item.reminderDateTime,
      isNotifiedForReminder: item.isNotifiedForReminder,
      isPinned: item.isPinned,
      isNotifiedForDue: item.isNotifiedForDue,
      subTasks: item.subTasks
      }

    this.taskservice.updateTask(updatedTask)
    .subscribe({
      next: (response) => {
        this.error="Task Updated Successfully";
        this.showToast=true;  
      },
      error: (response) => {                
        this.error=response;
        this.showToast=true;
      }
    })
  }
  


}
