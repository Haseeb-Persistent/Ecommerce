// catalog-effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, withLatestFrom, filter } from 'rxjs';
import { CatalogService } from '../../app/core/Services/catalog-service.service';
import {
  loadBrands,
  loadBrandsFailure,
  loadBrandsSuccess,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess
} from './catalog-action';
import { selectBrands, selectCategories } from './catalog-selector';

@Injectable()
export class CatalogEffects {

  constructor(
    private actions$: Actions,
    private catalogService: CatalogService,
    private store: Store
  ) {}

  // ✅ Categories Effect (CACHE ENABLED)
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      withLatestFrom(this.store.select(selectCategories)),
      filter(([action, categories]) =>
        action.force || categories.length === 0
      ),
      mergeMap(() =>
        this.catalogService.getCategories().pipe(
          map(res =>
            res.isSuccessed
              ? loadCategoriesSuccess({ Categories: res.data ?? [] })
              : loadCategoriesFailure({ error: res.message })
          ),
          catchError(error =>
            of(loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  // ✅ Brands Effect (CACHE ENABLED)
  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBrands),
      withLatestFrom(this.store.select(selectBrands)),
      filter(([action, brands]) =>
        action.force || brands.length === 0
      ),
      mergeMap(() =>
        this.catalogService.getBrands().pipe(
          map(res =>
            res.isSuccessed
              ? loadBrandsSuccess({ brands: res.data ?? [] })
              : loadBrandsFailure({ error: res.message })
          ),
          catchError(error =>
            of(loadBrandsFailure({ error }))
          )
        )
      )
    )
  );
}
