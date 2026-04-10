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
  verificationCode: string | null = null;
  displayEmail = '';
  helpDialog = false;
  isLoading = false;

  constructor(private router: Router) {}

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
    // TODO: call API with this.verificationCode and this.displayEmail
    this.isLoading = false;
  }
}