import { Component } from '@angular/core';
import { StartupService } from '../../../core/StartupService/startup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css'
})
export class CampaignComponent {
  campaigns: any[] = [];
  campaignModel = {
    name: '',
    status: 'Draft',
    reach: 0,
    description: '',
    task: ''
  };

  campaignTask: any[] = [];
  editMode = false;

  constructor(private campaignService: StartupService) { }

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {

    const id: any = localStorage.getItem('userId');

    this.campaignService.getCampaignByStartupId(id).subscribe(res => {
      this.campaigns = res;
    });
  }

  loadCampaginTasks(id: any) {
    this.campaignService.getCampaignById(id).subscribe(res => {
      this.campaignTask = res.tasks;
    });
  }

  saveCampaign() {

    const id: any = localStorage.getItem('userId');


    const updatedCampaign = {
      ...this.campaignModel,
      tasks: Array.isArray(this.campaignModel.task)
        ? this.campaignModel.task
        : this.campaignModel.task?.split(',').map((s: string) => s.trim()) || [],
    };


    if (this.editMode) {
      this.campaignService.updateCampaign(id, updatedCampaign).subscribe(() => {
        this.loadCampaigns();
        this.resetForm();
        alert('Campaign updated Succeful..!');
      });
    } else {
      this.campaignService.addCampaign(id, updatedCampaign).subscribe(() => {
        this.loadCampaigns();
        this.resetForm();
        alert('Campaign Added Succeful..!');
        window.location.reload();
      });
    }
  }

  editCampaign(id: any, campaign: any) {
    this.campaignService.getCampaignById(id).subscribe(res => {
      this.campaignTask = res.tasks || [];

      this.campaignModel = {
        ...campaign,
        task: [...this.campaignTask]
      };

      this.editMode = true;
    });
  }

  deleteCampaign(id: number) {
    this.campaignService.deleteCampaign(id).subscribe(() => this.loadCampaigns());
    alert('Campaign Deleted Succeful..!');
     window.location.reload();
  }

  resetForm() {
    this.campaignModel = {
      name: '',
      status: 'Draft',
      reach: 0,
      description: '',
      task: ''
    };
    this.editMode = false;
  }

}
