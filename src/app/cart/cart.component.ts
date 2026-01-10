import { Component, Inject, OnInit } from '@angular/core';
import { ProductResDto } from '../core/Models/catalog';
import { selectCartItems } from '../../redux/Cart/cart-selector';
import { environment } from '../core/enviroment/enviroment';
import { BASE_IMAGE_API } from '../core/Token/baseUrlToken';
import { addToCart, loadCart, removeFromCart } from '../../redux/Cart/cart-action';
import { AppState } from '../../redux/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
CartItem$ = this.store.select(selectCartItems);
 product!:ProductResDto;
apiUrl = environment.imageBaseApi;

  constructor(
    @Inject(BASE_IMAGE_API) public image: string,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadCart({ force: true }));
  }

  remove(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

CheckOut(id: number) {
    console.log('Check Out'); 
}
AddToCart(productId: number) {
      this.store.dispatch(addToCart({ productId }));
} 

    getImageUrl(product: ProductResDto): string {
    if (!product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }

    return (
      this.apiUrl +
      '/image/' +
      product.thumbnail.imageUrl.replace(/\\/g, '/')
    );
  }

}

