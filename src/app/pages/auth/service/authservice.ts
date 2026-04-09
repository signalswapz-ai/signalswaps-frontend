import { Apiservice } from '@/service/apiservice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
      user?: any;
      token?: string;
  };
}
export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})

export class Authservice {
  constructor(private apiService: Apiservice) {}

  register(payload: any): Observable<AuthResponse> {
      return this.apiService.post<AuthResponse>('auth/register', payload);
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
      return this.apiService.post<AuthResponse>('auth/login', payload);
  }
  
      resetPassword(payload: ResetPasswordPayload): Observable<AuthResponse> {
      return this.apiService.post<AuthResponse>('auth/reset-password', payload);
    }

}


  
