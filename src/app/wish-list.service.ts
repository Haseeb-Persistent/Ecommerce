import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishListItem } from './core/Models/WishListItem';
import { ResponseDto } from './core/Models/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

getWishList() {
  return this.http.get<WishListItem[]>('WishList/1');
}

addToWishList(productId: number) {
  return this.http.post<ResponseDto<null>>('WishList/Add', { userId: 1, productId });
}

removeFromWishList(productId: number) {
  return this.http.delete<ResponseDto<null>>(`WishList/Remove/${productId}`);  

}
}
