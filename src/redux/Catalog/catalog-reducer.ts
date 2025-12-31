// catalog-reducer.ts
import { createReducer, on } from '@ngrx/store';
import { BrandResDto, CatagoryResDto } from '../../app/core/Models/catalog';
import {
  loadBrandsFailure,
  loadBrandsSuccess,
  loadCategoriesFailure,
  loadCategoriesSuccess
} from './catalog-action';

export interface CatalogState {
  Categories: CatagoryResDto[];
  brands: BrandResDto[];
  error: any;
}

export const initialState: CatalogState = {
  Categories: [],
  brands: [],
  error: null
};

export const catalogReducer = createReducer(
  initialState,

  on(loadCategoriesSuccess, (state, { Categories }) => ({
    ...state,
    Categories,
    error: null
  })),

  on(loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands,
    error: null
  })),

  on(loadBrandsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
