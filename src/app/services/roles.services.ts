import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesServices {
  private apiUrl = 'http://localhost:3000/api/roles';  // URL del back-end
  private rol= '';

  constructor(private http: HttpClient) {}

  crearRol(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, this.rol);
  }
}

