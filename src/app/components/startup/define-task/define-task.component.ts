declare var bootstrap: any

import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../../core/StartupService/startup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-define-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './define-task.component.html',
  styleUrl: './define-task.component.css'
})
export class DefineTaskComponent implements OnInit {
  tasks: any[] = [];

  constructor(private service: StartupService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {

    const id: any = localStorage.getItem('userId');

    this.service.getStartupTask(id).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error("Error fetching tasks", err);
      }
    });
  }

  taskModel = {
    taskTitle: '',
    points: '',
    description: '',
    dueDate: '',
    status: ''
  }

  addTask() {
    const id: any = localStorage.getItem('userId');
    this.service.addTask(id, this.taskModel).subscribe({
      next: (data) => {
        alert('Task Added Succefully..');
        window.location.reload();
      },
      error: (err) => {
        console.error(err.error);
      }
    });

  }

  getCurrentTask(task: any) {
    this.taskModel = task;
  }

  updateTask() {

    const id: any = localStorage.getItem('userId');

    this.service.updateTask(id, this.taskModel).subscribe({
      next: (data) => {
        alert('Task Updeted Succefully..');
        window.location.reload();
      },
      error: (err) => {
        console.error(err.error);
      }
    });
  }


  delete(id: any) {
    this.service.deleteTask(id).subscribe(
      {
        next: (res) => {
          alert(res);
          window.location.reload();
        },
        error: (err) => {
          alert(err.error);
        }
      }
    );
  }
}
