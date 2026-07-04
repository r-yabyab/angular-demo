import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  imports: [],
  templateUrl: './topnav.html',
  styleUrl: './topnav.css',
})
export class Topnav {
  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
