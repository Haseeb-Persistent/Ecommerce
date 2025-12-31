// wish-list.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadWishlist, removeFromWishlist } from '../../redux/Wishlist/wishlist-action';
import { WishListItem } from '../core/Models/WishListItem';
import { selectWishlistItems } from '../../redux/Wishlist/wish-selector';
import { BASE_IMAGE_API } from '../core/Token/baseUrlToken';
import { AppState } from '../../redux/store';
import { ProductResDto } from '../core/Models/catalog';
import { environment } from '../core/enviroment/enviroment';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  wishlist$ = this.store.select(selectWishlistItems);
 product!:ProductResDto;
apiUrl = environment.imageBaseApi;

  constructor(
    @Inject(BASE_IMAGE_API) public image: string,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadWishlist({ force: true }));
    
  }

  remove(productId: number) {
    this.store.dispatch(removeFromWishlist({ productId }));
  }

  addToCart(productId: number) {
    console.log('Add to cart', productId);
  }

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

}

