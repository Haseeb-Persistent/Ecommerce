import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginReq, LoginResData } from '../Models/LoginReq';
import { ResponseDto } from '../Models/ResponseDto';
import { RegisterReq } from '../Models/auth';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsUserLoggedIn = false;
  isLoggingIn = false;
  apiUrl = environment.baseApi + 'Auth';

  constructor(private http: HttpClient) { }

  // Helper: Only access localStorage in browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  login(credential: LoginReq) {
    this.isLoggingIn = true;
    return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/login`, credential).pipe(
      tap(response => {
        if (this.isBrowser() && response.isSuccessed && response.data) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('username', response.data.username); 
          localStorage.setItem('userId', response.data.userId?.toString() || ''); 
          localStorage.setItem('role', response.data.role); 
          this.IsUserLoggedIn = true;
        }
        this.isLoggingIn = false;
      }),
      catchError(err => {
        this.isLoggingIn = false;
        throw err;
      })
    );
  }

  RegisterUser(userData: RegisterReq) {
    return this.http.post<ResponseDto<null>>(`${this.apiUrl}/register`, userData);
  }

  logout() {
    if (this.isBrowser()) localStorage.clear();
    this.IsUserLoggedIn = false;
  }

  getRole(): string | null {
    return this.isBrowser() ? localStorage.getItem('role') : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  RefreshUser() {
    if (!this.isBrowser() || this.isLoggingIn) return of(null);

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (!refreshToken || !accessToken) {
      this.clearAuth();
      return of(null);
    }

    return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/refresh-token`, { accessToken, refreshToken }).pipe(
      map(response => {
        if (this.isBrowser() && response.isSuccessed && response.data) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          this.IsUserLoggedIn = true;
        } else {
          this.clearAuth();
        }
        return response;
      }),
      catchError(() => {
        this.clearAuth();
        return of(null);
      })
    );
  }

  private clearAuth() {
    if (this.isBrowser()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    this.IsUserLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.isBrowser() ? !!localStorage.getItem('accessToken') : false;
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('accessToken') : null;
  }
}
