import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppState } from '../../../redux/store';
import { selectWishlistItems } from '../../../redux/Wishlist/wish-selector';
import { selectCartItems } from '../../../redux/Cart/cart-selector';

import { WishListItem } from '../../core/Models/WishListItem';
import { CartItem } from '../../core/Models/Cart';
import { AuthService } from '../../core/Services/authentication.service';
import { loadWishlist } from '../../../redux/Wishlist/wishlist-action';
import { loadCart } from '../../../redux/Cart/cart-action';
import { CartDrawerService } from '../../core/Services/cart-drawer.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  wishlist$!: Observable<WishListItem[]>;
  Cart$!: Observable<CartItem[]>;

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    private router: Router,
    private cartDrawer: CartDrawerService,
    @Inject(PLATFORM_ID) private platformId: Object  // ADD THIS
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {  // ✅ WRAP EVERYTHING
      this.isLoggedIn = this.authService.isLoggedIn();
      this.username = localStorage.getItem('username');
      
      this.store.dispatch(loadWishlist({ force: true }));
      this.wishlist$ = this.store.select(selectWishlistItems);
      
      this.store.dispatch(loadCart({ force: true }));
      this.Cart$ = this.store.select(selectCartItems);
    }
  }

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.isLoggedIn = false;
    this.router.navigate(['/Authentication/login']);
  }

  CartOpen() {
    this.cartDrawer.OpenCart();
  }
}
