import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      usuario_log: ['', [Validators.required, Validators.pattern('[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ]{8,30}')]],
      email: ['', [Validators.required, Validators.email]], // Agregar el campo de email
      clave_log: ['', [Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$*@.\\-])[a-zA-Z0-9$*@.\\-]{7,100}')]]
    });
  }

  resolvedCaptcha(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse;
    if (captchaResponse) {
      this.captchaToken = captchaResponse;
    } else {
      this.captchaToken = '';
    }
  }

  onSubmit() {
    if(this.loginForm.valid && this.captchaResolved) {
      const formData = {
        usuario_log: this.loginForm.value.usuario_log,
        clave_log: this.loginForm.value.clave_log,
        email: this.loginForm.value.email,
        captchaToken: this.captchaToken
      };

      this.authService.login(formData.usuario_log, formData.clave_log).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          alert('Error en el inicio de sesión. Por favor verifica tus credenciales.');
        }
      });
    }
  }
}
