import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)

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
        localStorage.setItem('accessToken', data.accessToken)
        console.log('Token saved to localStorage')
      }
      this.cdr.detectChanges()
    })
  }

}
