import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CatalogState } from "./catalog-reducer";

export const selectCatalogState=createFeatureSelector<CatalogState>('catalogStore');

export const selectCategories = createSelector(
  selectCatalogState,
  (state:CatalogState)=>state.Categories
)


export const selectBrands = createSelector(
  selectCatalogState,
  (state:CatalogState)=>state.brands
)