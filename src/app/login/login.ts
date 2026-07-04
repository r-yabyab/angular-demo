import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)
  authService = inject(AuthService)

  username = ""
  password = ""
  errorMessage = ""

  loginSubmit() {
    this.errorMessage = ""
    this.http.post<any>('https://dummyjson.com/auth/login', {
      username: this.username, //emilys
      password: this.password, //emilyspass
      expiresInMins: 30, // optional, defaults to 60
    }, {
      withCredentials: true // Include cookies (e.g., accessToken) in the request
    })
    .pipe(
      catchError(error => {
        this.errorMessage = "Incorrect user or password"
        this.cdr.detectChanges()
        return throwError(() => error)
      })
    )
    .subscribe(data => {
      console.log(data)
      if (data.accessToken) {
        this.authService.login(data.accessToken)
        console.log('Token saved and auth state updated')
      }
      this.cdr.detectChanges()
    })
  }

}
