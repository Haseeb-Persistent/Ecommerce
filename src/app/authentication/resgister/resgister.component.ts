import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/authentication.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../core/Services/messgae.service';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrl: './resgister.component.css'
})
export class ResgisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router :Router,private messageService:MessageService)   {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }






 
 submitLogin 
 = async () => {
   if (this.registerForm.invalid) {
     this.registerForm.markAllAsTouched();
     return;
   }
 
   const loginData = {
      userName: this.registerForm.value.userName,
     email: this.registerForm.value.email,
     password: this.registerForm.value.password
   };
   try {
     const response = await firstValueFrom(this.authService.RegisterUser(loginData));
     if (response.isSuccessed === true) {
       this.messageService.showMessage({
  type: 'success',
  text: response.message
});
       this.router.navigate(['/login']); 
     } else {
        this.messageService.showMessage({
  type: 'error',
  text: response.message
});
     }
   } catch (err) {
     console.error('Login error', err);
   }
 };
 
 
}
