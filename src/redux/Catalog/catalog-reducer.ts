import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { BrandResDto, CatagoryResDto } from '../../app/core/Models/catalog';
import { loadBrands, loadBrandsFailure, loadBrandsSuccess, loadCategories, loadCategoriesFailure, loadCategoriesSuccess } from './catalog-action';

export interface CatalogState{
  Categories:CatagoryResDto[],
  brands:BrandResDto[],
  error:any
}

const initialState:CatalogState={
  Categories:[],
  brands:[],
  error:null
}

export const catalogReducer = createReducer(
  initialState,
  on(loadCategories,(state)=>({...state})),
  on(loadCategoriesSuccess,(state,{Categories})=>(
    {
      ...state,
      Categories,
      error:null
    }
  )),
  on(loadCategoriesFailure,(state,{error})=>(
    {
      ...state,
      error
    }
  )),
  on(loadBrands, (state) => ({ ...state})),
  on(loadBrandsSuccess, (state,{brands})=>({
    ...state,
    brands,
    error:null
  })),
  on(loadBrandsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)