import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password: string = '';
  message: string = '';
  token: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    // Get token from URL param
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit() {
    if (!this.password) {
      this.message = 'Please enter a new password.';
      return;
    }

    this.http
      .post<any>(
        `http://localhost:5000/api/auth/reset-password/${this.token}`,
        { password: this.password }
      )
      .subscribe({
        next: (res) => {
          this.message = res.message || 'Password reset successfully!';
          this.password = '';
        },
        error: () => {
          this.message = 'Error resetting password.';
        }
      });
  }
}
