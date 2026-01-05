import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishListItem } from '../Models/WishListItem';
import { ResponseDto } from '../Models/ResponseDto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

getWishList() {
  return this.http.get<{ wishListItems: WishListItem[] }>('WishList/22')
    .pipe(
      map(res => res.wishListItems) 
    );
}

addToWishList(productId: number) {
  return this.http.post<ResponseDto<null>>('WishList/Add', { userId: 22, productId });
}

removeFromWishList(productId: number) {
  return this.http.delete<ResponseDto<null>>('WishList/Remove/'+ '22/'+productId);  

}
}
