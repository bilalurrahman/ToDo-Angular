import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksEntity } from '../Models/task-list.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  @Output() onSubmit = new EventEmitter<TasksEntity>();
  @ViewChild('form') form!: NgForm;
  @ViewChild('titleInput') titleInput!: any;
  task: TasksEntity = {
      id: '',
      createdBy: '',
      lastModifiedBy: '',
      createdDate: '',
      lastModifiedDate: '',
      isActive: true,
      userId: 0,
      isCompleted: false,
      isDeleted: false,
      title: '',
      description: '',
      status: 0,
      dueDate: '',
      haveReminder: false,
      reminderDateTime: '',
      isNotifiedForReminder: false,
      isPinned: false,
      isNotifiedForDue: false,
      subTasks: []
  };
  dynamicClass:string ='form-control';

  submitForm() {
    if (this.task.title!=='' &&  this.task.title!==null) {
      this.onSubmit.emit(this.task);
      this.task.title = ''; 
      this.form.resetForm();
      this.dynamicClass = 'form-control'; 
    }
    else{
      this.Validate();
    }
  }
Validate(){
    if(this.task.title=='' || this.task.title==null )
        this.dynamicClass = 'form-control is-invalid'
    else this.dynamicClass = 'form-control is-valid'
  }
}
