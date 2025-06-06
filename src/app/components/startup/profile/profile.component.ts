import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartupService } from '../../../core/StartupService/startup.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class StartupProfileComponent {
  profileForm!: FormGroup;

   points:any
  constructor(private fb: FormBuilder, private service: StartupService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [''],
      orgName: [''],
      orgEmail: [''],
      orgPhNo: [''],
    });

   

    const id: any = localStorage.getItem('userId');
    if (!id) {
      return;
    }

    this.service.getStartup(id).subscribe({
      next: (startup) => {
        this.profileForm.patchValue({
          id: startup.id,
          orgName: startup.orgName,
          orgEmail: startup.orgEmail,
          orgPhNo: startup.orgPhNo,
        });

        this.points=startup.points

      },
      error: (err) => {
        alert('Error loading startup profile: ' + err.message || err);
      }
    });
  }


  onSubmit() {

    const formValue = this.profileForm.value;

  const updatedUser = {
    ...formValue
  }

    this.service.updateStartup(updatedUser).subscribe({
      next: (startup) => {
        this.profileForm.patchValue({
          id: startup.id,
          orgName: startup.orgName,
          orgEmail: startup.orgEmail,
          orgPhNo: startup.orgPhNo
        });
        alert("Profile updated successfully!");
         window.location.reload();
      },
      error: (err) => {
        alert('Error Updating user profile: ');
      }
    });
  }

   logout() {
    localStorage.removeItem('userRole');
    window.location.reload(); 
  }
}
