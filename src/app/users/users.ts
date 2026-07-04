import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private userService = inject(User);
  private cdr = inject(ChangeDetectorRef);

  currentUser: any = null;
  errorMessage = '';

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      this.errorMessage = 'No valid token found. Please login first.';
      this.cdr.detectChanges();
      return;
    }

    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Invalid or expired token. Please login again.';
        this.cdr.detectChanges();
      }
    });
  }
}
