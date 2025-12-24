import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from 'rxjs';
import { CatalogService } from '../../app/core/Services/catalog-service.service';
import { loadBrands, loadBrandsFailure, loadBrandsSuccess, loadCategories, loadCategoriesFailure, loadCategoriesSuccess } from "./catalog-action";


@Injectable()
export class CatalogEffects{

  constructor(private action$:Actions,private catalogService:CatalogService){}


  loadCategories$=createEffect(()=>
  this.action$.pipe(
    ofType(loadCategories),
    mergeMap(()=>
      this.catalogService.getCategories().pipe(
        map((res)=>{
         return res.isSuccessed===true?
         loadCategoriesSuccess({Categories:res.data?res.data:[]}):
         loadCategoriesFailure({error:res.message});
        }),
        catchError((error)=>of(loadCategoriesFailure({error})))
      )
    )
  )
  )

      loadBrands$ = createEffect (() =>
      this.action$.pipe(
        ofType(loadBrands),
        mergeMap(()=>
          this.catalogService.getBrands().pipe(
            map((res)=> {
              return res.isSuccessed? loadBrandsSuccess({brands:res.data?res.data:[]}):loadBrandsFailure({error:res.message})
            }),
            catchError((error)=> of(loadBrandsFailure({ error })))
          )
        )
      )
  )
 }