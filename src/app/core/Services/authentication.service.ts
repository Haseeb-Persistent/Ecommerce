import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginReq, LoginResData } from '../Models/LoginReq';
import { ResponseDto } from '../Models/ResponseDto';
import { RegisterReq } from '../Models/auth';
import { environment } from '../enviroment/enviroment';
import { ok } from 'node:assert';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsUserLoggedIn: boolean = false;
  isLoggingIn: boolean = false;
  apiUrl: string = environment.baseApi + 'Auth';
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(credential: LoginReq) {
    this.isLoggingIn = true;

    return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/login`, credential).pipe(
      tap(response => {
        if (this.isBrowser() && response.isSuccessed && response.data) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
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
    return this.http.post<ResponseDto<null>>(`${this.apiUrl}/register`, userData)
  }

  logout() {
    if (!this.isBrowser()) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.IsUserLoggedIn = false;
  }


  // RefreshUser() 
  //   {
  //   var refreshToken = localStorage.getItem('refreshToken');
  //   var accessToken = localStorage.getItem('accessToken');
  //   return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/refresh-token`, {
  //     accessToken: accessToken,
  //     refreshToken: refreshToken
  //   }).pipe(
  //     map (response => {
  //       if (response.isSuccessed === true) {
  //         localStorage.setItem('accessToken', response.data?.accessToken!);
  //         localStorage.setItem('refreshToken', response.data?.refreshToken!);
  //       }
  //       else {
  //         localStorage.setItem('accessToken', '');
  //         localStorage.setItem('refreshToken', '');
  //         this.IsUserLoggedIn = false;
  //       }
  //       return response;
  //     }),
  //     catchError( () => {
  //       localStorage.setItem('accessToken', '');
  //       localStorage.setItem('refreshToken', '');
  //       this.IsUserLoggedIn = false;  
  //        return of();
  //     })
  //   );
  //   }

  RefreshUser() {
    if (!isPlatformBrowser(this.platformId) || this.isLoggingIn) {
      return of(null); // 🚫 browser check + login-time skip
    }

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (!refreshToken || !accessToken) {
      this.clearAuth();
      return of(null);
    }

    return this.http.post<ResponseDto<LoginResData>>(
      `${this.apiUrl}/refresh-token`,
      { accessToken, refreshToken }
    ).pipe(
      map(response => {
        if (response.isSuccessed && response.data) {
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
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('accessToken');
  }
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('accessToken');
  }























}
