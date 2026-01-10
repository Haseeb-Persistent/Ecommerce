// cart-effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  mergeMap,
  of,
  withLatestFrom,
  filter,
  from,
  tap
} from 'rxjs';

import {
  addToCart,
  loadCart,
  loadCartFailure,
  loadCartSuccess,
  removeFromCart
} from './cart-action';

import { CartService } from '../../app/core/Services/cart.service';
import { selectCartItems } from './cart-selector';
import { CartItem } from '../../app/core/Models/Cart';
import { MessageService } from '../../app/core/Services/messgae.service';

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private store: Store,
    private message: MessageService
  ) {}

  // ✅ LOAD CART (with cache)
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      withLatestFrom(this.store.select(selectCartItems)),
      filter(([action, items]) => action.force || items.length === 0),
      mergeMap(() =>
        from(this.cartService.getCart()).pipe(
          map((items: CartItem[]) =>
            loadCartSuccess({ items })
          ),
          catchError(error =>
            of(loadCartFailure({ error }))
          )
        )
      )
    )
  );

  // ✅ ADD TO CART + POPUP
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      mergeMap(({ productId }) =>
        from(this.cartService.addToCart(productId)).pipe(
          tap(res => {
            if (!res) return;
            this.message.showMessage({
              type: res.isSuccessed ? 'success' : 'error',
              text: res.message
            });
          }),
          map(() => loadCart({ force: true })),
          catchError(err => {
            this.message.showMessage({
              type: 'error',
              text: err?.error?.message || 'Something went wrong'
            });
            return of(loadCartFailure({ error: err }));
          })
        )
      )
    )
  );

  // ✅ REMOVE FROM CART + POPUP
  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCart),
      mergeMap(({ productId }) =>
        from(this.cartService.removeFromCart(productId)).pipe(
          tap(res => {
            if (!res) return;
            this.message.showMessage({
              type: res.isSuccessed ? 'success' : 'error',
              text: res.message
            });
          }),
          map(() => loadCart({ force: true })),
          catchError(err => {
            this.message.showMessage({
              type: 'error',
              text: err?.error?.message || 'Remove failed'
            });
            return of(loadCartFailure({ error: err }));
          })
        )
      )
    )
  );
}
