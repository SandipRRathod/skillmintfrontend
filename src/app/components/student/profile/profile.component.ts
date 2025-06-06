import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/AuthService/auth.service';
import { StudentService } from '../../../core/StudentService/student.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: StudentService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [''],
      userName: [''],
      userEmail: [''],
      userPhNo: [''],
      userSkills: [''],
      userInterests: [''],
    });

    const id: any = localStorage.getItem('userId');
    if (!id) {
      return;
    }

    this.service.getUser(id).subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          id: user.id,
          userName: user.userName,
          userEmail: user.userEmail,
          userPhNo: user.userPhNo,
          userSkills: user.userSkills,
          userInterests: user.userInterests,
        });

      },
      error: (err) => {
        alert('Error loading user profile: ' + err.message || err);
      }
    });
  }


  onSubmit() {
    const formValue = this.profileForm.value;

    const updatedUser = {
      ...formValue,
      userSkills: Array.isArray(formValue.userSkills)
        ? formValue.userSkills
        : formValue.userSkills?.split(',').map((s: string) => s.trim()) || [],

      userInterests: Array.isArray(formValue.userInterests)
        ? formValue.userInterests
        : formValue.userInterests?.split(',').map((s: string) => s.trim()) || []
    };

    this.service.updateUser(updatedUser).subscribe({
      next: (user) => {
        alert("Profile updated successfully!");

        this.profileForm.patchValue({
          id: user.id,
          userName: user.userName,
          userEmail: user.userEmail,
          userPhNo: user.userPhNo,
          userSkills: Array.isArray(user.userSkills) ? user.userSkills.join(', ') : user.userSkills,
          userInterests: Array.isArray(user.userInterests) ? user.userInterests.join(', ') : user.userInterests
        });
        window.location.reload();
      },
      error: (err) => {
        alert('Error Updating user profile: ' + (err.message || err));
      }
    });
  }

 logout() {
    localStorage.removeItem('userRole');
    window.location.reload(); 
  }
}
