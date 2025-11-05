import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://localhost:5000/api/auth/forgot-password', { email: this.email })
      .subscribe({
        next: (res) => this.message = res.message,
        error: (err) => this.message = 'Error sending reset email.'
      });
  }
}
