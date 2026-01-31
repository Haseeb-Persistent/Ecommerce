import { ProductResDto } from "./catalog";

export interface CartItem {
 quantity: number;
 id: number;
 productId: number;
 product: ProductResDto;
}   