import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login'; // Cambia esto según tu API

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post(this.apiUrl, credentials).subscribe(
      (response: any) => {
        // Guardar el token en localStorage o manejar la respuesta como necesites
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']); // Redirige al home después de un login exitoso
      },
      (error) => {
        console.error('Login fallido', error);
        // Manejar el error (puedes mostrar un mensaje al usuario)
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
