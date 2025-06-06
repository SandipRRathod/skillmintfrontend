import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 
  

    private apiUrl = 'http://localhost:3677/api/user';

  constructor(private http:HttpClient) { }

  getUser(id: number):Observable<any> {
return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }

  getAllUser():Observable<any> {
return this.http.get<any>(`${this.apiUrl}/getall`);
  }

  updateUser(user: any):Observable<any> {
   return this.http.put<any>(`${this.apiUrl}/update`,user);
  }


getUserTask(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/tasks/${id}`);
}


   getUserPoints(id: number):Observable<any> {
return this.http.get<any>(`${this.apiUrl}/get-points/${id}`);
  }

  addTask(id:number,task:any):Observable<any>{
return this.http.post<any>(`${this.apiUrl}/tasks/add/${id}`,task,{responseType:'text' as 'json'})
  }

  updateTask(id:any,task:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/tasks/update/${id}`,task);
  }


  deleteTask(id:any):Observable<any>{
return this.http.delete<any>(`${this.apiUrl}/tasks/delete/${id}`,{responseType:'text' as 'json'});
  }

   getStartupTask():Observable<any>{
return this.http.get<any>(`http://localhost:3677/api/startup/tasks/all`);
  }
}
