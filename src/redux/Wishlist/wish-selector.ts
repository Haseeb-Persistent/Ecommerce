// wishlist-selector.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist-reducer';

export const selectWishlistState =
  createFeatureSelector<WishlistState>('wishlistStore');

export const selectWishlistItems = createSelector(
  selectWishlistState,
  state => state.items
);

export const selectWishlistCount = createSelector(
  selectWishlistItems,
  items => items.length
);

export const selectIsInWishlist = (productId: number) =>
  createSelector(
    selectWishlistItems,
    items => items.some(i => i.productId === productId)
  );
