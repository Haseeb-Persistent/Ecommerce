import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const role = this.authService.getRole(); // admin / user

    if (role === 'ADMIN') {
      return true; // ✅ allow
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
