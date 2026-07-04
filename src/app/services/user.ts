import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com';

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No access token found');
    }

    return this.http.get(`${this.apiUrl}/user/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
  }
}
