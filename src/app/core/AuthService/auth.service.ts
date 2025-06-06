import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedInUser = new BehaviorSubject<boolean>(true);
  public loggedInStartup = new BehaviorSubject<boolean>(true);

  private apiUrl = 'http://localhost:3677/api'; // adjust if needed

  constructor(private http: HttpClient) { }



  /**
   * GET user by email and password (Login)
   */
  getUser(email: string, password: string): Observable<any> {
    const params = new HttpParams()

      .set('email', email)
      .set('password', password);

    return this.http.get(`${this.apiUrl}/user/get`, { params });
  }

  /**
    * GET startup by email and password (Login)
    */
  getStartup(email: string, password: string): Observable<any> {
    const params = new HttpParams()

      .set('email', email)
      .set('pass', password);

    return this.http.get(`${this.apiUrl}/startup/get`, { params });
  }

 registerUser(user: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/user/save`, user, {responseType: 'text' as 'json'});
}

  registerStartup(startup: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/startup/save`, startup,{responseType: 'text' as 'json'});
  }
}
