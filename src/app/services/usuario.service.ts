import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';  // URL de tu back-end

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
}
