import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  // { path: 'category', component: AddCategoryComponent },
  // { path: 'brand', component: AddBrandComponent },
  // { path: 'product', component: AddProductComponent },
  // { path: 'layout-admin', component: AdminLayoutComponent }, 
  // { path: '', redirectTo: 'layout-admin', pathMatch: 'full' } 

  {
    path: '', // admin root
    component: AdminLayoutComponent,
    children: [
      { path: 'category', component: AddCategoryComponent },
      { path: 'brand', component: AddBrandComponent },
      { path: 'product', component: AddProductComponent },
      { path: '', redirectTo: 'category', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCatalogRoutingModule { }
