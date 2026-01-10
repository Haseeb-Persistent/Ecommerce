import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map, of, tap } from 'rxjs';
import { LoginReq, LoginResData } from '../Models/LoginReq';
import { ResponseDto } from '../Models/ResponseDto';
import { RegisterReq } from '../Models/auth';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseApi + 'Auth';
  IsUserLoggedIn = false;
  isLoggingIn = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /** ======================
   *  LOGIN
   * ====================== */
  login(credential: LoginReq) {
    this.isLoggingIn = true;
    return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/login`, credential).pipe(
      tap(response => {
        if (this.isBrowser() && response.isSuccessed && response.data) {
          this.setAuthStorage(response.data);
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

  /** ======================
   *  REGISTER
   * ====================== */
  RegisterUser(userData: RegisterReq) {
    return this.http.post<ResponseDto<null>>(`${this.apiUrl}/register`, userData)
  }

  /** ======================
   *  LOGOUT
   * ====================== */
  logout() {
    if (!this.isBrowser()) return;
    this.clearAuth();
  }

  /** ======================
   *  REFRESH USER / TOKEN
   *  Call this on app init to restore session
   * ====================== */
  refreshUser() {
    if (!this.isBrowser() || this.isLoggingIn) return of(null);

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      this.clearAuth();
      return of(null);
    }

    return this.http.post<ResponseDto<LoginResData>>(
      `${this.apiUrl}/refresh-token`,
      { accessToken, refreshToken }
    ).pipe(
      map(response => {
        if (response.isSuccessed && response.data) {
          this.setAuthStorage(response.data);
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

  /** ======================
   *  HELPERS
   * ====================== */
  private setAuthStorage(data: LoginResData) {
    if (!this.isBrowser()) return;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('username', data.username);
    localStorage.setItem('userId', data.userId?.toString() || '');
    localStorage.setItem('role', data.role);
  }

  private clearAuth() {
    if (!this.isBrowser()) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.IsUserLoggedIn = false;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('accessToken') && !!localStorage.getItem('userId');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  getRole(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('role');
  }

  getUserId(): number | null {
    if (!this.isBrowser()) return null;
    const id = localStorage.getItem('userId');
    return id ? parseInt(id, 10) : null;
  }

  getUsername(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('username');
  }

  getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('accessToken');
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
