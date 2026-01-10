import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../core/Services/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
canActivate(): boolean {
    if (this.auth.isAdmin()) return true;
    this.router.navigate(['/']); // redirect non-admin users
    return false;
  }
}
