import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../core/Services/catalog-service.service';
import { ProductResDto } from '../../core/Models/catalog';
import { environment } from '../../core/enviroment/enviroment';
import { AppState } from '../../../redux/store';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../redux/Cart/cart-action';
import { CartDrawerService } from '../../core/Services/cart-drawer.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!: ProductResDto | null;
  apiUrl = environment.imageBaseApi;

  constructor(
    private route: ActivatedRoute,
    private productService: CatalogService,
    private store: Store<AppState>,
    private cartDraw :CartDrawerService
  ) {}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('PRODUCT ID:', id);

  if (!id) return;

  this.productService.getProductById(id)
    .subscribe(res => {
      console.log('API RESPONSE:', res);
      this.product = res.data;
    }, err => console.error('API ERROR:', err));
}

OpenCartDrawer(){
   this.cartDraw.OpenCart()
}
  getImageUrl(): string {
    if (!this.product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }
    return this.apiUrl + '/' + this.product.thumbnail.imageUrl.replace(/\\/g, '/');
  }
  quantity: number = 1;

increaseQuantity() {
  if (this.product && this.quantity < this.product.stockQuantity) {
    this.quantity++;
  }
}

decreaseQuantity() {
  if (this.product && this.quantity > 1) {
    this.quantity--;
  }
}



AddToCart( productId: number) {
   this.store.dispatch(addToCart({ productId }));
}

}
