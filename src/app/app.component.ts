import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CatagoryResDto } from './core/Models/catalog';
import { AppState } from '../redux/store';
import { Store } from '@ngrx/store';
import { selectCategories } from '../redux/Catalog/catalog-selector';
import { loadCategories } from '../redux/Catalog/catalog-action';
import { NavigationEnd, Router } from '@angular/router';
import { WishListItem } from './core/Models/WishListItem';
import { selectWishlistItems } from '../redux/Wishlist/wish-selector';
import { MessageService } from './core/Services/messgae.service';
import { AuthService } from './core/Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';
   showLayout = true;

  categories$:Observable<CatagoryResDto[]>;
   wishlist$!: Observable<WishListItem[]>; // wishlist$ is an Observable of array

  constructor(private store:Store<AppState>,private router: Router,private pop:MessageService,private auth:AuthService){
    this.categories$ = this.store.select(selectCategories);
      this.wishlist$ = this.store.select(selectWishlistItems);
  }

  

  ngOnInit(): void {

    this.auth.refreshUser().subscribe()

      this.wishlist$ = this.store.select(selectWishlistItems);
    this.categories$.pipe(
      tap((categories)=>{
        if(categories.length===0){
          this.store.dispatch(loadCategories({force: false}));
        }
      })
    )
    .subscribe()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide layout for admin routes
        if (event.url.includes('/Authentication') || event.url.includes('/Admin')) {
          this.showLayout = false;
        } else {
          this.showLayout = true;
        }
      }
    });
  }
     // use this.

  }