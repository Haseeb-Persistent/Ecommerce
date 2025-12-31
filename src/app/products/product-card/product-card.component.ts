import { Component, Input } from '@angular/core';
import { ProductResDto } from '../../core/Models/catalog';
import { environment } from '../../core/enviroment/enviroment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { addToWishlist } from '../../../redux/Wishlist/wishlist-action';
import { WishListItem } from '../../core/Models/WishListItem';
import { MessageService } from '../../messgae.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: ProductResDto;
  showMore = false;
  apiUrl = environment.imageBaseApi;
  wishListItems: WishListItem[] = []; // store subscription

  constructor(private store: Store<AppState>,private popup:MessageService) {
    // Keep wishlist items updated
    this.store.select(state => state.wishList.items).subscribe(id => {
      this.wishListItems = id;
    });
  }

  getImageUrl(): string {
    if (!this.product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }
    return this.apiUrl + '/' + this.product.thumbnail.imageUrl.replace(/\\/g, '/');
  }

  AddToWishList(productId: number) {
    this.store.dispatch(addToWishlist({ productId }));
    this.popup.showMessage({ type: 'success', text: 'Product added to wishlist!' });
  }
}
