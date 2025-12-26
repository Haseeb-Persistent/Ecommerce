import { Component, OnInit } from '@angular/core';
import { ProductFilter, ProductResDto } from '../core/Models/catalog';
import { CatalogService } from '../core/Services/catalog-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private catalogService: CatalogService) { }

  products: ProductResDto[] = [];
  count!: number;
  minPrice!: number;
  maxPrice!: number;
pageSize: number = 10;

  initialFilter: ProductFilter = {
    pageIndex: 1,
    pageSize: 10,
    sort: 'featured',
  };

  filter$ = new BehaviorSubject<ProductFilter>(this.initialFilter);

  ngOnInit() {
    // Subscribe to filter changes
    this.filter$.subscribe((filter) => {
      // Pass the updated filter here, not initialFilter
      this.catalogService.getAllProducts(filter).subscribe(res => {
        if (res.data?.data) {
          this.products = res.data.data;
          this.count = res.data.count;
        }
        if (res.data?.minPrice != null) {
          this.minPrice = res.data.minPrice;
        }
        if (res.data?.maxPrice != null) {
          this.maxPrice = res.data.maxPrice;
        }
      });
    });
  }

  // Pagination handler
  display(pageIndex: number) {
    this.initialFilter = {
      ...this.initialFilter,
      pageIndex: pageIndex  
    };
    this.filter$.next(this.initialFilter);
  }

  // Filters handler
  onFilterChanged(filters: any) {
    this.initialFilter = {
      ...this.initialFilter,
      categoryId: filters.categoryId,
      brandId: filters.brandId,
      inStock: filters.inStock,
      ratings: filters.rating,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      pageIndex: 1 // reset page when filter changes
    };
    this.filter$.next(this.initialFilter);
  }

  // Sorting handler
  sortHeaderChanges(sort: any) {
    this.pageSize = sort.itemToShow;
    this.initialFilter = {
      ...this.initialFilter,
      pageSize: sort.itemToShow,
      sort: sort.sortBy,
      pageIndex: 1 // reset page when sorting changes
    };
    this.filter$.next(this.initialFilter);
  }
}
