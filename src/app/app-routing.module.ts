import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProductViewComponent } from './products/product-view/product-view.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  children: [
    { path: '', component: HomePageComponent },
     {
      path: 'WishList',
      component:WishListComponent
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
      {
      path: 'Admin',
      loadChildren: () => import('./admin/add-catalog/add-catalog.module').then(m => m.AddCatalogModule)
    },
     {
      path:'Authentication',
      loadChildren: () => import('./authentication/authentication.module').then (m => m.AuthenticationModule)
     }
    
  ]
  
},


{
 path: ':id',
 component:ProductViewComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
