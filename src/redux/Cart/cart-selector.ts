import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart-reducer';

export const selectCartState = createFeatureSelector<CartState>('cartStore');

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

export const selectCartCount = createSelector(
  selectCartItems,
  items => items.length
);

export const selectIsInCart = (productId: number) =>
  createSelector(
    selectCartItems,
    items => items.some(i => i.productId === productId)
  );
