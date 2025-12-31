import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CatagoryResDto } from './core/Models/catalog';
import { AppState } from '../redux/store';
import { Store } from '@ngrx/store';
import { selectCategories } from '../redux/Catalog/catalog-selector';
import { loadCategories } from '../redux/Catalog/catalog-action';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';
   showLayout = true;

  categories$:Observable<CatagoryResDto[]>;
  constructor(private store:Store<AppState>,private router: Router){
    this.categories$ = this.store.select(selectCategories);
  }

  ngOnInit(): void {
    this.categories$.pipe(
      tap((categories)=>{
        if(categories.length===0){
          this.store.dispatch(loadCategories({force: false}));
        }
      })
    )
    .subscribe()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide layout for admin routes
        if (event.url.includes('/Admin')) {
          this.showLayout = false;
        } else {
          this.showLayout = true;
        }
      }
    });
  }
  }