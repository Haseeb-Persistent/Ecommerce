import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RatingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
  RatingComponent,
    RouterModule

  ]
})
export class SharedModule { }
