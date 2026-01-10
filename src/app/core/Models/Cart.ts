import { ProductResDto } from "./catalog";

export interface CartItem {
 id: number;
 productId: number;
 product: ProductResDto;
}   