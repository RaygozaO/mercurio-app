import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${environment.apiBaseUrl}${environment.endpoints.login}`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, pass: string, captchaToken: string): Observable<any> {
    const payload = { email, pass, captchaToken };
    return this.http.post(this.loginUrl, payload);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
