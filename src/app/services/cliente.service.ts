import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cliente, Domicilio, Usuario} from "../clientes/cliente.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerColoniasPorCP(codigoPostal: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/colonias/${codigoPostal}`);
  }

  crearCliente(cliente: Cliente, usuario: Usuario, domicilio: Domicilio): Observable<any> {
    const payload = {cliente, usuario, domicilio};
    return this.http.post<any>(`${this.apiUrl}/crear`, payload);
  }
}
