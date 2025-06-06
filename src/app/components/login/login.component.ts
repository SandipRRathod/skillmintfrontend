import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  showPassword = false;

  login_role: any;

  email: string = '';
  password: string = '';


  constructor(private authService: AuthService,private roter:Router) {}

  login() {
    if (this.login_role == 'student') {
      this.userlogin();
    } else {
      this.startuplogin();
    }

  }

  

  userlogin() {
    this.authService.getUser(this.email, this.password).subscribe({
      next: (user) => {
        localStorage.setItem('userRole', this.login_role);
        localStorage.setItem('userId', user.id);
        alert('Login Succefull Fill Out Interests and Skills If Not Added..!');
        
         this.roter.navigate(['/student/profile']);
          window.location.reload();
      },
      error: (err) => {
       alert(err.error);
      }
    });
  }

  startuplogin() {
    this.authService.getStartup(this.email, this.password).subscribe({
      next: (startup) => {
        localStorage.setItem('userRole', this.login_role);
        localStorage.setItem('userId', startup.id);
        
        alert('Login Succefull...');
        this.roter.navigate(['/startup/profile']);
         window.location.reload();
      },
      error: (err) => {
        alert(err.error);
      }
    });
  }

  loginAs(role: string) {
    this.login_role = role;
  }
}
