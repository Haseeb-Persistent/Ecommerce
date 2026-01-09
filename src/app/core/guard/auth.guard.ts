import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../Services/authentication.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isUserAuthenticated = authService.IsUserLoggedIn;
   var router = inject(Router);
  var accessToken = localStorage.getItem('accessToken');

  if (isUserAuthenticated === true && accessToken !== null && accessToken.length > 0) {
    return true;
  }
  router.navigateByUrl('Authentication/login');
  return false;
};
