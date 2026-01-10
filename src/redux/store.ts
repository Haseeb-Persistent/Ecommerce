import { CartEffects } from "./Cart/cart-effect";
import { cartReducer, CartState } from "./Cart/cart-reducer";
import { CatalogEffects } from "./Catalog/catalog-effect";
import { catalogReducer, CatalogState } from "./Catalog/catalog-reducer"
import { wishlistReducer, WishlistState } from "./Wishlist/wishlist-reducer"
import { WishlistEffects } from "./Wishlist/wistlish-effect";

export interface AppState {
  catalog:CatalogState
  wishList:WishlistState
  cart:CartState
}
export const store={
  catalogStore: catalogReducer,
  wishlistStore: wishlistReducer,
  cartStore: cartReducer,
}



export const appEffects = [CatalogEffects, WishlistEffects, CartEffects];


