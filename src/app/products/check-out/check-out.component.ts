import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../../redux/store';
import { CheckoutServiceService } from '../../core/Services/checkout-service.service';
import { selectCartItems } from '../../../redux/Cart/cart-selector';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cartItems$!: Observable<any[]>;
  totalPrice$!: Observable<number>;

  billing = {
    fullname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  };

  constructor(
    private store: Store<AppState>,
    private checkoutService: CheckoutServiceService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);

    this.totalPrice$ = this.cartItems$.pipe(
      map(items => items.reduce(
        (total, item) => total + item.product.newPrice * item.quantity,
        0
      ))
    );
  }

placeOrder() {
  this.cartItems$.subscribe(cartItems => {

    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    const order = {
      customerName: this.billing.fullname,
      customerEmail: this.billing.email,
      items: cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.newPrice
      }))
    };

    this.checkoutService.checkout(order).subscribe({
      next: (res: any) => {
        alert('Order placed successfully ✅');
        this.store.dispatch({ type: '[Cart] Clear Cart' });
        this.router.navigateByUrl('/OrderSuccess')
    const audio = new Audio('assets/Succes-Order.mp3');
    audio.play();
      },
      error: (err) => {
        console.error(err);
        alert('Order failed ❌');
      }
    });

  }).unsubscribe();
}


}
