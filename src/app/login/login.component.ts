import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  loginForm: FormGroup;
  captchaResolved: boolean = false;
  captchaToken: string = '';
  useCaptcha = environment.useCaptcha;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave_log: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$*@.\\-])[a-zA-Z0-9$*@.\\-]{7,100}')
      ]]
    });
  }

  resolvedCaptcha(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse;
    this.captchaToken = captchaResponse || '';
  }

  onSubmit() {
    if (this.loginForm.valid && (this.captchaResolved || !this.useCaptcha)) {
      const formData = {
        email: this.loginForm.value.email,
        pass: this.loginForm.value.clave_log,
        captchaToken: this.useCaptcha ? this.captchaToken : 'dummy-token'
      };

      this.authService.login(
        formData.email,
        formData.pass,
        formData.captchaToken
      ).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);

          const decoded = this.decodeToken(response.token);
          const role = decoded?.id_rol || 'usuario';
          localStorage.setItem('role', role);

          if (role === 1) {
            this.router.navigate(['/admin']);
          } else if (role === 2) {
            this.router.navigate(['/ventas']);
          } else if (role === 3) {
            this.router.navigate(['/pacientes']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          alert('Error en el inicio de sesión. Por favor verifica tus credenciales.');
        }
      });
    }
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}
