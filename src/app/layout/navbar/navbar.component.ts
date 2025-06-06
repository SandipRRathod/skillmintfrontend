import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule,LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: string | null = null;

  constructor(private authS: AuthService) {
    this.isLoggedIn = localStorage.getItem('userRole');
  }

  logout() {
    localStorage.removeItem('userRole');
    this.isLoggedIn = null;
    window.location.reload(); // Reload to reflect logout in navbar
  }
}
