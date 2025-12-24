import { Component } from '@angular/core';

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
  
    products = [
    '/assets/product-1.jpg',
    '/assets/product-2.jpg',
    '/assets/product-3.jpg',
    '/assets/product-4.jpg',
    '/assets/product-5.jpg',
    '/assets/product-6.jpg',
    '/assets/product-7.jpg',
    '/assets/product-8.jpg',
    '/assets/product-9.jpg',
   '/assets/product-10.jpg'
  ];

  get groupedProducts() {
    const chunkSize = 5;
    const result = [];
    for (let i = 0; i < this.products.length; i += chunkSize) {
      result.push(this.products.slice(i, i + chunkSize));
    }
    return result;
  }
}