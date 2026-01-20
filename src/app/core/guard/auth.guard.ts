import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = authService.IsUserLoggedIn;

  if (isLoggedIn && accessToken) {
    router.navigateByUrl('/dashboard'); 
    return false; 
  }
  return true; 
};
