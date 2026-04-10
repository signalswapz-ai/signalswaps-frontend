import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { VerificationNewRegister } from './verification-new-register/verification-new-register';
import { CreatePassword } from './create-password/create-password';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'verification-new-register', component: VerificationNewRegister },
    { path: 'create-password', component: CreatePassword },
    { path: 'forgot-password', component: ForgotPassword }
] as Routes;
