import { Component, Input } from '@angular/core';
import { ProductResDto } from '../../core/Models/catalog';
import { environment } from '../../core/enviroment/enviroment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { removeFromWishlist } from '../../../redux/Wishlist/wishlist-action';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  constructor(private store: Store<AppState> ) {}
  
@Input() product!:ProductResDto;
showMore = false;
apiUrl = environment.imageBaseApi;

  getImageUrl(): string {
    if (!this.product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }

    return (
      this.apiUrl +
      '/' +
      this.product.thumbnail.imageUrl.replace(/\\/g, '/')
    );
  }



    AddToWishList(productId: number) {
      this.store.dispatch(removeFromWishlist({ productId }));
    }
  products: ProductResDto[] = [];
  }
