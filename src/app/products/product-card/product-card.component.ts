import { Component, Input, OnInit } from '@angular/core';
import { ProductResDto } from '../../core/Models/catalog';
import { environment } from '../../core/enviroment/enviroment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { addToWishlist } from '../../../redux/Wishlist/wishlist-action';
import { WishListItem } from '../../core/Models/WishListItem';
import { MessageService } from '../../core/Services/messgae.service';
import { CartItem } from '../../core/Models/Cart';
import { addToCart, clearCartLocal } from '../../../redux/Cart/cart-action';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartDrawerService } from '../../core/Services/cart-drawer.service';
import Aos from 'aos';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit  {
  role: string | null = null;
    isAdmin: boolean = false; // admin flag
  @Input() product!: ProductResDto;
  selectedProduct!:number;
  showMore = false;
  apiUrl = environment.imageBaseApi;
  wishListItems: WishListItem[] = []; 
  cartItems: CartItem[] = []; 

  constructor(private store: Store<AppState>,private popup:MessageService,private router: Router, private route: ActivatedRoute, private cartDrawer: CartDrawerService
   ) {
    this.store.select(state => state.wishList.items).subscribe(id => {
      this.wishListItems = id;
    });
        this.store.select(state => state.cart.items).subscribe(id => {
      this.cartItems = id;
    });
  }
 ngOnInit(): void {
    const role = localStorage.getItem('role'); // get role from localStorage
    this.isAdmin = role === 'ADMIN';           // set admin flag
  }

// ViewProduct(id:number){
//    this.selectedProduct = this.product.id
// }
ViewProduct(id: number) {
  this.router.navigate(['detail', id], { relativeTo: this.route });
}
  getImageUrl(): string {
    if (!this.product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }
    return this.apiUrl + '/' + this.product.thumbnail.imageUrl.replace(/\\/g, '/');
  }

  AddToWishList(productId: number) {
    this.store.dispatch(addToWishlist({ productId }));
    // this.popup.showMessage({ type: 'success', text: 'Product added to wishlist!' });
  }

async AddToCart(productId: number) {
   this.store.dispatch(clearCartLocal());
  this.cartDrawer.OpenCart();
    await this.store.dispatch(addToCart({ productId }));
    
    setTimeout(() => {
        this.cartDrawer.OpenCart();
              Aos.refreshHard();
    }, 500);
}

}
