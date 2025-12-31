// wishlist-action.ts
import { createAction, props } from '@ngrx/store';
import { WishListItem } from '../../app/core/Models/WishListItem';

export const loadWishlist = createAction(
  '[Wishlist] Load',
  props<{ force?: boolean }>()
);

export const loadWishlistSuccess = createAction(
  '[Wishlist] Load Success',
  props<{ items: WishListItem[] }>()
);

export const loadWishlistFailure = createAction(
  '[Wishlist] Load Failure',
  props<{ error: any }>()
);

export const addToWishlist = createAction(
  '[Wishlist] Add',
  props<{ productId: number }>()
);

export const removeFromWishlist = createAction(
  '[Wishlist] Remove',
  props<{ productId: number }>()
);
