import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/auth';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();

    if (token && token !== 'undefined' && token !== 'null') {
      this.userSubject.next({ loading: true });
      this.getProfile().subscribe({
        next: (user) => {
          // Todo ok, el userSubject ya tiene los datos reales
        },
        error: () => {
          console.error('Token expirado o inválido');
          this.logout();
        },
      });
    }
  }

  register(data: { full_name: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
        this.userSubject.next(res.user);
        // this.getProfile().subscribe();
      }),
    );
  }

  getProfile() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http
      .get(`${this.apiUrl}/profile`, { headers })
      .pipe(tap((user) => this.userSubject.next(user)));
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
