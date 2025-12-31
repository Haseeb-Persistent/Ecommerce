import { ProductResDto } from "./catalog";

export interface WishListItem {
 id: number;
 productId: number;
 Product: ProductResDto;
}