import { AuthService } from "../core/Services/authentication.service";



export function appInitializer(authService: AuthService) {
  return () => authService.RefreshUser().toPromise();
}