// catalog-action.ts
import { createAction, props } from '@ngrx/store';
import { BrandResDto, CatagoryResDto } from '../../app/core/Models/catalog';

export const loadCategories = createAction(
  '[Catalog] Load Categories',
  props<{ force?: boolean }>() // 👈 optional force reload
);

export const loadCategoriesSuccess = createAction(
  '[Catalog] Load Categories Success',
  props<{ Categories: CatagoryResDto[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Catalog] Load Categories Failure',
  props<{ error: any }>()
);

export const loadBrands = createAction(
  '[Catalog] Load Brands',
  props<{ force?: boolean }>()
);

export const loadBrandsSuccess = createAction(
  '[Catalog] Load Brands Success',
  props<{ brands: BrandResDto[] }>()
);

export const loadBrandsFailure = createAction(
  '[Catalog] Load Brands Failure',
  props<{ error: any }>()
);
