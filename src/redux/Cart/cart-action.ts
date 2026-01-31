import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../app/core/Models/Cart';

export const loadCart = createAction(
  '[Cart] Load',
  props<{ force?: boolean }>()
);

export const loadCartSuccess = createAction(
  '[Cart] Load Success',
  props<{ items: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add',
  props<{ productId: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove',
  props<{ productId: number }>()
);
// Increase quantity (local)
export const increaseQtyLocal = createAction(
  '[Cart] Increase Quantity',
  props<{ productId: number }>()
);

// Decrease quantity (local)
export const decreaseQtyLocal = createAction(
  '[Cart] Decrease Quantity',
  props<{ productId: number }>()
);

export const clearCartLocal = createAction('[Cart] Clear Cart');


