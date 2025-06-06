
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService {


  private apiUrl = 'http://localhost:3677/api/startup';

  constructor(private http: HttpClient) {}


   getStartup(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/get/${id}`);
}

  updateStartup(fb: any) {
     return this.http.put<any>(`${this.apiUrl}/update`,fb);
  }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks/all`);
  }

  addTask(id:number,task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/add/${id}`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/update/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/delete/${id}`,{responseType:'text' as 'json'});
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`);
  }

  getStartupTask(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/tasks/list/${id}`);
}



//campaign
getAllCampaigns(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/campaigns/all`);
  }

  addCampaign(id:number,campaign: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/campaigns/add/${id}`, campaign);
  }

  updateCampaign(id: number, campaign: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/campaigns/update/${id}`, campaign);
  }

  deleteCampaign(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/campaigns/delete/${id}`);
  }

  getCampaignById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/campaigns/${id}`);
  }

   getCampaignByStartupId(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/campaigns/list/${id}`);
}
}
