// wishlist-effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, withLatestFrom, filter } from 'rxjs';
import {
  addToWishlist,
  loadWishlist,
  loadWishlistFailure,
  loadWishlistSuccess,
  removeFromWishlist
} from './wishlist-action';
import { WishListService } from '../../app/core/Services/wish-list.service';
import { selectWishlistItems } from './wish-selector';

@Injectable()
export class WishlistEffects {

  constructor(
    private actions$: Actions,
    private wishlistService: WishListService,
    private store: Store
  ) {}

  // ✅ LOAD (with cache)
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWishlist),
      withLatestFrom(this.store.select(selectWishlistItems)),
      filter(([action, items]) =>
        action.force || items.length === 0
      ),
      mergeMap(() =>
        this.wishlistService.getWishList().pipe(
          map(items => loadWishlistSuccess({ items })),
          catchError(error =>
            of(loadWishlistFailure({ error }))
          )
        )
      )
    )
  );

  // ✅ ADD
  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToWishlist),
      mergeMap(({ productId }) =>
        this.wishlistService.addToWishList(productId).pipe(
          map(() => loadWishlist({ force: true })),
          catchError(error =>
            of(loadWishlistFailure({ error }))
          )
        )
      )
    )
  );

  // ✅ REMOVE
  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromWishlist),
      mergeMap(({ productId }) =>
        this.wishlistService.removeFromWishList(productId).pipe(
          map(() => loadWishlist({ force: true })),
          catchError(error =>
            of(loadWishlistFailure({ error }))
          )
        )
      )
    )
  );
}
