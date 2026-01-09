import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/authentication.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../core/Services/messgae.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  submitLogin = async () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    try {
      const response = await firstValueFrom(this.authService.login(loginData));
      if (response.isSuccessed) {
        this.messageService.showMessage({
          type: 'success',
          text: response.message,
        });

        // ✅ redirect to child route of HomeComponent
        this.router.navigate(['/dashboard']);
      } else {
        this.messageService.showMessage({
          type: 'error',
          text: response.message,
        });
      }
    } catch (err: any) {
      this.messageService.showMessage({
        type: 'error',
        text: err?.error?.message || 'Something went wrong',
      });
    }
  };
}
