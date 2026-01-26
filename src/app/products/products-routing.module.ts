import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
{
  path: 'detail/:id',
  component: ProductViewComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
