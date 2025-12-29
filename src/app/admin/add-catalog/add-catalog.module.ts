import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCatalogRoutingModule } from './add-catalog-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCategoryComponent,
    AddBrandComponent,
    AddProductComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    AddCatalogRoutingModule,
    // NgModule,
    ReactiveFormsModule,
    FormsModule,
    // CommonModule
  ]
})
export class AddCatalogModule { }
