import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    // Si el usuario está autenticado (hay token), permite acceso
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Permitir acceso a la ruta del login y a rutas de creación de usuarios/clientes
    const allowedRoutes = ['login', 'crear-usuario', 'crear-cliente', 'crear-medico', 'crear-empleado','dashboard']; // Agrega las rutas permitidas aquí
    if (allowedRoutes.includes(route.routeConfig.path)) {
      return true;
    }

    // Si no está autenticado y no está en la ruta permitida, redirigir a login
    this.router.navigate(['/login']);
    return false;
  }
}
