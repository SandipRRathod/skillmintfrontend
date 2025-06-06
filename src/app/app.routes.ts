import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/student/profile/profile.component';
import { StartupProfileComponent } from './components/startup/profile/profile.component';
import { TasksComponent } from './components/student/tasks/tasks.component';
import { RewardsComponent } from './components/student/rewards/rewards.component';
import { CampaignComponent } from './components/startup/campaign/campaign.component';
import { DefineTaskComponent } from './components/startup/define-task/define-task.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard, authLRGuard } from './core/guards/auth.guard';
import { SubmissionsComponent } from './components/startup/submissions/submissions.component';

export const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'register', component: RegisterComponent ,canActivate:[authLRGuard]},
  { path: 'login', component: LoginComponent  ,canActivate:[authLRGuard]},
  { path: 'logout', component: LandingComponent  ,canActivate:[authGuard]},
  { path: 'student/profile', component: ProfileComponent ,canActivate:[authGuard]},
  { path: 'student/tasks', component: TasksComponent ,canActivate:[authGuard]},
  { path: 'student/rewards', component: RewardsComponent ,canActivate:[authGuard]},
  { path: 'startup/campaign', component: CampaignComponent ,canActivate:[authGuard]},
  { path: 'startup/define', component: DefineTaskComponent ,canActivate:[authGuard]},
  { path: 'startup/profile', component: StartupProfileComponent ,canActivate:[authGuard]},
  { path: 'startup/submissions', component: SubmissionsComponent ,canActivate:[authGuard]},
];
