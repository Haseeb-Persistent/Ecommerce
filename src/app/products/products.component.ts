import { Component, OnInit } from '@angular/core';
import { ProductFilter, ProductResDto } from '../core/Models/catalog';
import { CatalogService } from '../core/Services/catalog-service.service';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private catalogService: CatalogService) { }
pageIndex!:number;
products:ProductResDto[]=[];
count!:number;
  initialFilter :ProductFilter={
     pageIndex:1,
     pageSize:10,
  }

  filter$ = new BehaviorSubject<ProductFilter>(this.initialFilter);


  ngOnInit(){
    this.filter$.subscribe((filter) => {
  this.catalogService.getAllProducts(this.initialFilter).subscribe(res=>{
      if(res.data?.data){
     this.products=res.data.data;
     this.count=res.data.count;
      }
   });
    } )
  }

  

  display(pageIndex: number) {
    this.initialFilter= {
       ...this.initialFilter,
       pageIndex: pageIndex
    }
    this.filter$.next(this.initialFilter);
  } 

filters!:object;
onFilterChanged(filterData:any) { 
  this.initialFilter= {
       ...this.initialFilter,
       categoryId:filterData.categoryId,
       brandId:filterData.brandId,
       inStock:filterData.inStock,
      ratings:filterData.rating,
        minPrice:filterData.minPrice,
        maxPrice:filterData.maxPrice

    }
    this.filter$.next(this.initialFilter);
}





sortFilter!:object;
sortHeaderChanges(sortData:object) {
  this.sortFilter = sortData;
}



}
  