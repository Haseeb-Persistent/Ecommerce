import { Component } from '@angular/core';
import { ProductResDto } from '../core/Models/catalog';
import { CatalogService } from '../core/Services/catalog-service.service';

export interface Product {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'] 
  })
export class HomePageComponent {
    constructor(private catalogService: CatalogService) { }

 products: ProductResDto[] = [];
ngOnInit() {
  this.catalogService.getAllProducts().subscribe(res => {
    if (res.data?.data) {
      // Filter featured only
      this.products = res.data.data.filter(p => p.isFeatured);
    }
  });
}

    


get groupedProducts() {
  const chunkSize = 5;
  const result = [];
  for (let i = 0; i < this.products.length; i += chunkSize) {
    result.push(this.products.slice(i, i + chunkSize));
  }
  return result;
}

}