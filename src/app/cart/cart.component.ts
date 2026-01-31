import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductResDto } from '../core/Models/catalog';
import { selectCartItems } from '../../redux/Cart/cart-selector';
import { addToCart, removeFromCart, loadCart, decreaseQtyLocal, increaseQtyLocal, loadCartSuccess } from '../../redux/Cart/cart-action';
import { AppState } from '../../redux/store';
import { BASE_IMAGE_API } from '../core/Token/baseUrlToken';
import { CartDrawerService } from '../core/Services/cart-drawer.service';
import { AuthService } from '../core/Services/authentication.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  CartItem$!: Observable<any[]>;
  totalPrice$!: Observable<number>;
  isOpen = false;

  constructor(
    private store: Store<AppState>,
    private cartDrawer: CartDrawerService,
    public  authService:AuthService,
    private router:Router,
    @Inject(BASE_IMAGE_API) private imageUrl: string
  ) {
    this.CartItem$ = this.store.select(selectCartItems);

    this.totalPrice$ = this.CartItem$.pipe(
      map(items =>
        items.reduce(
          (total, item) =>
            total + item.product.newPrice * item.quantity,
          0
        )
      )
    );

    this.cartDrawer.drawer$.subscribe(val => {
      this.isOpen = val;
        document.body.style.overflow = val ? 'hidden' : 'auto';
    });
  }

  ngOnInit(): void {
 this.store.dispatch(loadCartSuccess({ items: [] }));
  this.store.dispatch(loadCart({ force: true }));  }

increase(productId: number) {
  this.store.dispatch(increaseQtyLocal({ productId }));
}
GotoCheckOut(){
  this.cartDrawer.CloseCart()
  this.router.navigateByUrl('CheckOut')
}

decrease(productId: number) {
  this.store.dispatch(decreaseQtyLocal({ productId }));
}



  close() {
    this.cartDrawer.CloseCart();
  }
removeFromCart(productId: number) {
  this.store.dispatch(removeFromCart({ productId }));
  localStorage.setItem('cartItems', JSON.stringify([]));
}

  trackById(index: number, item: any) {
    return item.product.id;
  }
  
  RedirectToShop(){
    this.cartDrawer.CloseCart()
    this.router.navigateByUrl('/dashboard')
  }

  ViewItem(id: number) {
    this.cartDrawer.CloseCart();
    this.router.navigate(['products/detail/', id]);
  }

  getImageUrl(product: ProductResDto): string {
    if (!product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }

    return (
      this.imageUrl +
      '/image/' +
      product.thumbnail.imageUrl.replace(/\\/g, '/')
    );
  }
}
