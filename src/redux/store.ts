import { CatalogEffects } from "./Catalog/catalog-effect";
import { catalogReducer, CatalogState } from "./Catalog/catalog-reducer"
import { wishlistReducer } from "./Wishlist/wishlist-reducer"
import { WishlistEffects } from "./Wishlist/wistlish-effect";

export interface AppState {
  catalog:CatalogState
}
export const store={
  catalogStore: catalogReducer,
  wishlistStore: wishlistReducer
}



export const appEffects = [CatalogEffects, WishlistEffects];


