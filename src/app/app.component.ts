import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CatagoryResDto } from './core/Models/catalog';
import { AppState } from '../redux/Catalog/store';
import { Store } from '@ngrx/store';
import { selectCategories } from '../redux/Catalog/catalog-selector';
import { loadCategories } from '../redux/Catalog/catalog-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';

  categories$:Observable<CatagoryResDto[]>;
  constructor(private store:Store<AppState>){
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit(): void {
    this.categories$.pipe(
      tap((categories)=>{
        if(categories.length===0){
          this.store.dispatch(loadCategories())
        }
      })
    )
    .subscribe()
  }
}