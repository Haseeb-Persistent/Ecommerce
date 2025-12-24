import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductsComponent } from './products.component';
import { Router } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    ProductsComponent,
    PaginationComponent,
    FilterComponent,
    SortHeaderComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    LayoutModule,
    SharedModule,
    FormsModule
]
})
export class ProductsModule { }
