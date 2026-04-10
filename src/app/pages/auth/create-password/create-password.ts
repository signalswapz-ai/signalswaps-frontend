  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { RouterModule } from '@angular/router';
  import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
  import { ButtonModule } from 'primeng/button';
  import { FluidModule } from 'primeng/fluid';
  import { PasswordModule } from 'primeng/password';
  import { ProgressSpinnerModule } from 'primeng/progressspinner';
  import { RippleModule } from 'primeng/ripple';

  @Component({
    selector: 'app-create-password',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      AppFloatingConfigurator,
      ButtonModule,
      FluidModule,
      PasswordModule,
      ProgressSpinnerModule,
      RippleModule,
    ],
    templateUrl: './create-password.html',
    styleUrl: './create-password.scss',
  })
  export class CreatePassword {
    password = '';
    isLoading = false;

    isPasswordValid(): boolean {
      const p = this.password ?? '';
      if (p.length < 8 || p.length > 128) return false;
      if (!/\d/.test(p)) return false;
      if (!/[A-Z]/.test(p)) return false;
      return true;
    }

    onContinue(): void {
      if (!this.isPasswordValid()) return;
      // call API, then navigate
      
    }
  }