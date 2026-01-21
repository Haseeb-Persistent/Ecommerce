import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../Models/ResponseDto';
import { map } from 'rxjs';
import { AuthService } from './authentication.service';
import { CartItem } from '../Models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private auth: AuthService) { }

getCart() {
  const userId = this.getCurrentUserId();

  if (!userId) {
    return [];
  }

  return this.http
    .get<{ cartItems: CartItem[] }>(`Cart/${userId}`)
    .pipe(map(res => res.cartItems));
}


  addToCart(productId: number) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('User not logged in');

    return this.http.post<ResponseDto<null>>('Cart/Add', { userId, productId });
  }

  removeFromCart(productId: number) {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('User not logged in');

    return this.http.delete<ResponseDto<null>>(`Cart/Remove/${userId}/${productId}`);
  }

getCurrentUserId() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId');
  }
  return null;
}
}
