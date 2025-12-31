// wishlist-reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadWishlistFailure,
  loadWishlistSuccess
} from './wishlist-action';
import { WishListItem } from '../../app/core/Models/WishListItem';

export interface WishlistState {
  items: WishListItem[];
  error: any;
}

export const initialState: WishlistState = {
  items: [],
  error: null
};

export const wishlistReducer = createReducer(
  initialState,

  on(loadWishlistSuccess, (state, { items }) => ({
    ...state,
    items,
    error: null
  })),

  on(loadWishlistFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
