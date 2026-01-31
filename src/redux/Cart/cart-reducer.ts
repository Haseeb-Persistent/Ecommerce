import { createReducer, on } from '@ngrx/store';
import { clearCartLocal, decreaseQtyLocal, increaseQtyLocal, loadCartFailure, loadCartSuccess } from './cart-action';
import { CartItem } from '../../app/core/Models/Cart';

export interface CartState {
  items: CartItem[];
  error: any;
}

export const initialState: CartState = {
  items: [],
  error: null
};

export const cartReducer = createReducer(
  initialState,

  on(loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    error: null
  })),
on(increaseQtyLocal, (state, { productId }) => ({
  ...state,
  items: state.items.map(item =>
    item.product.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  )
})),

on(decreaseQtyLocal, (state, { productId }) => ({
  ...state,
  items: state.items
    .map(item =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0) // remove if 0
})),
  on(loadCartFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(clearCartLocal, state => ({
  ...state,
  items: []
}))

);
