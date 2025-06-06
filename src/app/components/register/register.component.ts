import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  showPassword = false;

  role: any;

  registerModel = {
    userName: '',
    orgName: '',
    email: '',
    phone: '',
    password: '',
  };




  constructor(private service: AuthService, private route: Router) {
  }

  onSubmit() {
    if (this.role === 'student') {
      const form = {
        userName: this.registerModel.userName,
        userEmail: this.registerModel.email,
        userPass: this.registerModel.password,
        userPhNo: this.registerModel.phone
      };
      this.userRegistration(form);
    } else {
      const form = {
        orgName: this.registerModel.orgName,
        orgEmail: this.registerModel.email,
        orgPass: this.registerModel.password,
        orgPhNo: this.registerModel.phone
      }
      this.startupRegistration(form);
    }
  }

  userRegistration(student: any) {
    this.service.registerUser(student).subscribe(
      {
        next: (resp) => {
          alert(resp);
          this.route.navigate(['/login']);
        },
        error: (error) => {
          alert(error.error);
        }
      }
    );
  }


  startupRegistration(startup: any) {
    this.service.registerStartup(startup).subscribe(
      {
        next: (resp) => {
          alert(resp);
          this.route.navigate(['/login']);
        },
        error: (error) => {
          alert(error.error);
        }
      }
    );
  }



  RegisterAs(role: string) {
    this.role = role;
  }
}
