import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FluidModule } from 'primeng/fluid';
import { InputOtpModule } from 'primeng/inputotp';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { Authservice } from '../service/authservice';

@Component({
  selector: 'app-verification-new-register',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppFloatingConfigurator,
    ButtonModule,
    DialogModule,
    FluidModule,
    InputOtpModule,
    ProgressSpinnerModule,
    RippleModule,
  ],
  templateUrl: './verification-new-register.html',
  styleUrl: './verification-new-register.scss',
})
export class VerificationNewRegister implements OnInit {
  verificationCode: any;
  displayEmail : any;
  helpDialog = false;
  isLoading = false;
  
  errorDialog = false;
  errorMessage: any;

  constructor(private router: Router , private authService: Authservice) {}

  ngOnInit(): void {
    this.getEmailRegister();
  }
  
  getEmailRegister(): void {
    const email = localStorage.getItem('email-register');
    if (email) {
      this.displayEmail = email.trim().toLowerCase();
    }
  }

  isCodeComplete(): boolean {
    return (this.verificationCode?.length ?? 0) === 6;
  }

  openHelpDialog(): void {
    this.helpDialog = true;
  }

  closeHelpDialog(): void {
    this.helpDialog = false;
  }

   onContinue(): void {
      if (!this.isCodeComplete()) return;
      this.isLoading = true;
      const payload = {
        email: this.displayEmail.trim().toLowerCase(),
        code: this.verificationCode?.trim()
      };
      console.log(payload);
      
      this.authService.verifyActivationCode(payload).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/create-password']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Verification failed. Please try again.';
          this.errorDialog = true;
        },
      });
  
  }
}