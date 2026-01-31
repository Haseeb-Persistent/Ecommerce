import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Models/ResponseDto';
import { CartItem } from '../Models/Cart';
import { AuthService } from './authentication.service';

export interface CheckoutItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface CheckoutRequest {
  customerName: string;
  customerEmail: string;
  items: CheckoutItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  checkout(order: CheckoutRequest): Observable<ResponseDto<any>> {
    return this.http.post<ResponseDto<any>>(
      'Orders/checkout',
      order
    );
  }

  getOrderById(orderId: number) {
    return this.http.get(`Orders/${orderId}`);
  }

  getAllOrders() {
    return this.http.get('Orders');
  }
}
