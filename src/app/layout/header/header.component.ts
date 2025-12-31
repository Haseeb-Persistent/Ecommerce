import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/store';
import { selectWishlistItems } from '../../../redux/Wishlist/wish-selector';
import { WishListItem } from '../../core/Models/WishListItem';
import { Observable } from 'rxjs';
import { loadWishlist } from '../../../redux/Wishlist/wishlist-action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // fixed plural
})
export class HeaderComponent implements OnInit {

  wishlist$!: Observable<WishListItem[]>; // wishlist$ is an Observable of array
  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
        this.store.dispatch(loadWishlist({ force: true }));
    this.wishlist$ = this.store.select(selectWishlistItems);
  }

}
