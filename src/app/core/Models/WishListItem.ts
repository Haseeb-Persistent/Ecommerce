import { ProductResDto } from "./catalog";

export interface WishListItem {
 id: number;
 productId: number;
 product: ProductResDto;
}   