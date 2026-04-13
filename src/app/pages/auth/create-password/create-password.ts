import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { Authservice } from '../service/authservice';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    FluidModule,
    PasswordModule,
    ProgressSpinnerModule,
    RippleModule,
    DialogModule
  ],
  templateUrl: './create-password.html',
  styleUrl: './create-password.scss',
})
export class CreatePassword {
  password = '';
  isLoading = false;
  errorDialog = false;
  errorMessage: any;

  displayEmail: any;
  successDialog = false;
  constructor(private router: Router, private authService: Authservice) { }

  ngOnInit(): void {
    this.getEmailRegister();
  }

  getEmailRegister(): void {
    const email = localStorage.getItem('email-register');
    if (email) {
      this.displayEmail = email.trim().toLowerCase();
    }
  }
  isPasswordValid(): boolean {
    const p = this.password ?? '';
    if (p.length < 8 || p.length > 128) return false;
    if (!/\d/.test(p)) return false;
    if (!/[A-Z]/.test(p)) return false;
    return true;
  }

  onContinue(): void {
    if (!this.isPasswordValid()) return;
    this.isLoading = true;
    const payload = {
      email: this.displayEmail,
      password: this.password
    };
    console.log(payload);
    this.authService.createPassword(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successDialog = true;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to create password. Please try again.';
        this.errorDialog = true;
      }
    });
  }

  goToLogin(): void {
    this.successDialog = false;
    localStorage.removeItem('email-register'); // optional cleanup
    this.router.navigate(['/auth/login']);
  }
}