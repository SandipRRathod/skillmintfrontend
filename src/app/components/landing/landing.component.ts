import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  isLoggedIn:any
  constructor(private route:Router){
    this.isLoggedIn = localStorage.getItem('userRole');
  }

  getStarted(){
    this.route.navigate(['/login']);
  }

}
