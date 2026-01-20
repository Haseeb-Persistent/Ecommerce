import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RatingComponent } from './components/rating/rating.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [
    RatingComponent,
    LoaderComponent,
    CartComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // components
    RatingComponent,
    LoaderComponent,

    // angular modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CartComponent
  ]
})
export class SharedModule {}
