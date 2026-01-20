import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { authGuard } from './core/guard/auth.guard';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomePageComponent },
      { path: 'WishList', component: WishListComponent },
      { path: 'Cart', component: CartComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'Admin',
        //  canActivateChild: [authGuard],
        loadChildren: () =>
          import('./admin/add-catalog/add-catalog.module').then(
            (m) => m.AddCatalogModule
          ),
      },
      {
        path: 'Authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

  // fallback for unknown routes
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
