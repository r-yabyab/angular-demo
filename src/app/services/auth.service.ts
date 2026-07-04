import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal(false);
  currentToken = signal<string | null>(null);

  constructor() {
    this.checkAuth();
  }

  checkAuth() {
    const token = localStorage.getItem('accessToken');
    this.isAuthenticated.set(!!token);
    this.currentToken.set(token);
  }

  login(token: string) {
    localStorage.setItem('accessToken', token);
    this.currentToken.set(token);
    this.isAuthenticated.set(true);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.currentToken.set(null);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return this.currentToken();
  }
}
