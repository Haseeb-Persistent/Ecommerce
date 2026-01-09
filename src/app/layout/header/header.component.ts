import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { selectWishlistItems } from '../../../redux/Wishlist/wish-selector';
import { WishListItem } from '../../core/Models/WishListItem';
import { Observable } from 'rxjs';
import { loadWishlist } from '../../../redux/Wishlist/wishlist-action';
import { AuthService } from '../../core/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // fixed plural
})
export class HeaderComponent implements OnInit {

isLoggedIn = false;

  wishlist$!: Observable<WishListItem[]>; 
  constructor(private store: Store<AppState>,public authService:AuthService,private router:Router) { }
  ngOnInit(): void {
     this.isLoggedIn = this.authService.isLoggedIn();
        this.store.dispatch(loadWishlist({ force: true }));
    this.wishlist$ = this.store.select(selectWishlistItems);
    
  }

  logOut() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/Authentication/login']);
  }

}
