import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthenticationModule } from '../authentication/authentication.module';



@NgModule({
  declarations: [
    RatingComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationModule

    
  ],
  exports: [
  RatingComponent,
    RouterModule,
    LoaderComponent,
    AuthenticationModule
    

  ]
})
export class SharedModule { }
