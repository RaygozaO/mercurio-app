import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  loginForm: FormGroup;
  captchaResolved: boolean = false;
  captchaToken: string = '';

  resolvedCaptcha(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse;
    if (captchaResponse) {
      this.captchaToken = captchaResponse;
    } else {
      this.captchaToken = '';
    }
  }


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      usuario_log: ['', [Validators.required, Validators.pattern('[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ]{8,30}')]],
      clave_log: ['', [Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$*@.\\-])[a-zA-Z0-9$*@.\\-]{7,100}')]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid && this.captchaResolved) {
      const formData = {
        usuario_log: this.loginForm.value.nombreusuario,
        clave_log: this.loginForm.value.pass,
        captchaToken: this.loginForm.value.captchaToken,
      };
      if (this.loginForm.valid) {
        const { usuario_log, clave_log } = this.loginForm.value;
        this.authService.login(usuario_log, clave_log).subscribe({
          next: (response) => {
            // Guardar el token en localStorage
            localStorage.setItem('token', response.token);
            // Redirigir a otra ruta después de un inicio de sesión exitoso
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Error en el inicio de sesión', error);
            alert('Error en el inicio de sesión. Por favor verifica tus credenciales.');
          }
        });
      }
      console.log('Datos del login', formData);
    }
  }
}


