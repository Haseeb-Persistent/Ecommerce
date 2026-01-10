import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { selectWishlistItems } from '../../../redux/Wishlist/wish-selector';
import { WishListItem } from '../../core/Models/WishListItem';
import { Observable } from 'rxjs';
import { loadWishlist } from '../../../redux/Wishlist/wishlist-action';
import { AuthService } from '../../core/Services/authentication.service';
import { Router } from '@angular/router';
import { loadCart } from '../../../redux/Cart/cart-action';
import { selectCartCount, selectCartItems } from '../../../redux/Cart/cart-selector';
import { CartItem } from '../../core/Models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // fixed plural
})
export class HeaderComponent implements OnInit {

isLoggedIn = false;
username: string | null = localStorage.getItem('userName');

  wishlist$!: Observable<WishListItem[]>; 
  Cart$!: Observable<CartItem[]>; 
  constructor(private store: Store<AppState>,public authService:AuthService,private router:Router) { }
  ngOnInit(): void {
     this.isLoggedIn = this.authService.isLoggedIn();
        this.store.dispatch(loadWishlist({ force: true }));
    this.wishlist$ = this.store.select(selectWishlistItems);
        this.store.dispatch(loadCart({ force: true }));
    this.Cart$ = this.store.select(selectCartItems);
    this.username = localStorage.getItem('username');
  }

  logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/Authentication/login']);
  }

}
