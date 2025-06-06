declare var bootstrap: any

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../core/StudentService/student.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  startupTasks: any[] = [];

  task: any[] = [];
  filteredTasks: any[] = [];
  selectedStatus: string = 'all';
  constructor(private service: StudentService) { }

  selectedTask: any = null;
  selectedFile: File | null = null;
  comment: string = '';

  selectTask(task: any) {
    this.selectedTask = task;

    this.applyModel.taskName = task.taskTitle;

    const id: any = localStorage.getItem('userId');

    this.service.getUser(id).subscribe({
      next: (user) => {
        this.applyModel.userName = user.userName;
        this.applyModel.userEmail = user.userEmail;
      }
    });

  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }

  applyModel = {
    taskName: '',
    userName: '',
    userEmail: '',
    link: '',
    doc: this.selectedFile
  }

  taskModel = {
    id: '',
    taskName: '',
    taskDescription: '',
    taskStatus: '',
    taskPoints: '',
    taskDueDate: '',
  }



  ngOnInit(): void {
    this.getStartupTasks()
    this.getTasks();
  }

  getTasks() {
  const id: any = localStorage.getItem('userId');
  this.service.getUserTask(id).subscribe({
    next: (res) => {
      this.task = res;  
      this.applyFilter(); 
    },
    error: (err) => {
      alert('Failed to load User tasks');
    }
  });
}


  getStartupTasks() {
    this.service.getStartupTask().subscribe({
      next: (res) => {
        this.startupTasks = res;
      },
      error: (err) => {
        alert('Failed to load tasks');
      }
    });
  }



  addTask() {

    const modalEl = document.getElementById('addTaskModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const id: any = localStorage.getItem('userId');
    this.service.addTask(id, this.taskModel).subscribe({
      next: (task) => {
        this.filteredTasks = task;
        alert('task added succefully');
        modal?.hide();
      },
      error: (err) => {
        alert('Failed to add tasks');
      }
    });

  }

  deleteTask(id: any) {
    this.service.deleteTask(id).subscribe(
      {
        next: (res) => {
          alert(res);
        },
        error: (err) => {
          alert(err);
        }
      }
    );
  }

  selectedTaskIndex: number = -1;

  editTask(task: any) {
    this.taskModel = { ...task }; // clone the task data
    this.selectedTaskIndex = this.filteredTasks.indexOf(task); // to update it later
  }

  updateTask() {
    if (this.selectedTaskIndex > -1) {
      this.filteredTasks[this.selectedTaskIndex] = { ...this.taskModel };

      // Close modal programmatically
      const modalEl = document.getElementById('updateTaskModal');
      const modal = bootstrap.Modal.getInstance(modalEl);



      this.service.updateTask(this.taskModel.id, this.taskModel).subscribe(
        {
          next: (task) => {
            this.task = task;
            alert('Task updated successfully!');
            modal?.hide();
          },
          error: (err) => {
            alert('Failed to Update task');
          }
        }
      );


    }
  }

  applyFilter() {
    if (this.selectedStatus === 'all') {
      this.filteredTasks = this.task;
    } else {
      this.filteredTasks = this.task.filter(task =>
        task.taskStatus.toLowerCase() === this.selectedStatus
      );
    }
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    this.applyFilter();
  }

  aplyToTask() {

  }

  notIntereseted(task: any) {

  }


  submitProof() {
    
  }

}
