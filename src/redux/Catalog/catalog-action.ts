import { createAction, props } from "@ngrx/store";
import { BrandResDto, CatagoryResDto } from "../../app/core/Models/catalog";

export const loadCategories = createAction ('[catalog] load Categories');

export const loadCategoriesSuccess = createAction(
  '[catalog] load Categories Success',
  props<{Categories:CatagoryResDto[]}>()
)
export const loadCategoriesFailure = createAction(
  '[catalog] load Categories Failure',
  props<{error:any}>()
)

export const loadBrands = createAction('[Brand] Load Brands');
export const loadBrandsSuccess = createAction(
  '[Brand] Load Brands Success',
  props<{ brands: BrandResDto[]}>()
);
export const loadBrandsFailure = createAction(
  '[Brand] Load Brands Failure',
  props<{ error: any}>()
);