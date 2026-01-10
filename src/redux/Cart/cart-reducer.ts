import { createReducer, on } from '@ngrx/store';
import { loadCartFailure, loadCartSuccess } from './cart-action';
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

  on(loadCartFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
