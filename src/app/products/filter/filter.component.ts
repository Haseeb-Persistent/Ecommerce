import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandResDto, CatagoryResDto } from '../../core/Models/catalog';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBrands, selectCategories } from '../../../redux/Catalog/catalog-selector';
import { loadBrands } from '../../../redux/Catalog/catalog-action';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'] 
})
export class FilterComponent implements  OnInit {

 categories$:Observable<CatagoryResDto[]>
 brands$:Observable<BrandResDto[]>;

  constructor(private store:Store) {
this.categories$ = this.store.select(selectCategories);
 this.brands$ = this.store.select(selectBrands);
     
   }


   ngOnInit(): void {
      this.brands$.pipe( 
         tap(brands=> {
           if(brands.length === 0 ) {
             this.store.dispatch(loadBrands());
         }
        })
      )
      .subscribe();
     
   }


  @Input() selectedCategoryIds: number  []=[];
  @Input() selectedBrandIds: number  []=[];
  @Input() selectedStockType: boolean = true;
  @Input() selectedRating: number  []=[];
  @Input() minPrice!: number;
  @Input() maxPrice!: number;
  @Input() selectedMinPrice: number = this.minPrice;
  @Input() selectedMaxPrice: number = this.maxPrice;
  @Output() filterChanged=new EventEmitter<any>();





rating = [
   {value:5,selected:false},
   {value:4,selected:false},
   {value:3,selected:false},
   {value:2,selected:false},
   {value:1,selected:false},    
]

onMinPriceChange() {
  if (this.selectedMinPrice > this.selectedMaxPrice) {
    this.selectedMinPrice = this.selectedMaxPrice;
  }
  this.applyFilters();
}

onMaxPriceChange() {
  if (this.selectedMaxPrice < this.selectedMinPrice) {
    this.selectedMaxPrice = this.selectedMinPrice;
  }
  this.applyFilters();
  
}
  
toggleRating(ratingValue: number) {
   const index = this.selectedRating.indexOf(ratingValue);
   if (index === -1) {
     this.selectedRating.push(ratingValue);
   } else {
     this.selectedRating.splice(index, 1);
   }
   this.applyFilters();
}

toggleCategory(categoryId: number) {
  const index = this.selectedCategoryIds.indexOf(categoryId); 
  if(index === -1) {
    this.selectedCategoryIds.push(categoryId);
  } else {
    this.selectedCategoryIds.splice(index, 1);
  } 
  this.applyFilters();
}

toggleBrand(BrandId: number) {
  const index = this.selectedBrandIds.indexOf(BrandId); 
  if(index === -1) {
    this.selectedBrandIds.push(BrandId);
  } else {
    this.selectedBrandIds.splice(index, 1);
  } 
  this.applyFilters();
}

toggleStockType(value: boolean) {
  this.selectedStockType = value;
  this.applyFilters();
} 

applyFilters() {
  const selectedFilters = {  
      categoryId:this.selectedCategoryIds,
      brandId:this.selectedBrandIds,
      inStock:this.selectedStockType,
      ratings:this.selectedRating,
      minPrice:this.selectedMinPrice,
      maxPrice:this.selectedMaxPrice
  }
 this.filterChanged.emit(selectedFilters);
}
}

