import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';

const routes: Routes = [
  {path:'login',component:LoginComponent ,},
  {path:'register',component:ResgisterComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
