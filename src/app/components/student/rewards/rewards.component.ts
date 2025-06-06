import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../core/StudentService/student.service';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css'
})
export class RewardsComponent {
 totalPoints :number=0 ;
withdrawalMessage = '';


constructor(private service:StudentService){
  this.getPoints();
  this.showLeader();
}

completedTasks = [
 
];

leaderboard:any

requestWithdrawal() {
  this.withdrawalMessage = 'Withdrawal request submitted successfully! ✅';
}


paymentMethod = {
  upiId: '',
  bankAccount: '',
  ifsc: '',
};

withdrawalHistory = [
];

savePaymentMethod() {
  
}

getPoints(){

  const id:any=localStorage.getItem('userId');

  this.service.getUserPoints(id).subscribe({
  next:(resp)=>{
    this.totalPoints=resp;
    console.log(this.totalPoints)
  }
  });

}



showLeader() {
  this.service.getAllUser().subscribe({
    next: (resp) => {
      // Sort by highest points
      const sorted = resp.sort((a: any, b: any) => b.userPoints - a.userPoints);

      // Get logged-in user's ID
      const id: any = localStorage.getItem('userId');

      // Assign rank and label logged-in user as "You"
      this.leaderboard = sorted.map((user: any, index: number) => ({
        ...user,
        userName: user.id == id ? 'You' : user.userName,
        rank: index + 1
      }));
    }
  });
}


  
}
