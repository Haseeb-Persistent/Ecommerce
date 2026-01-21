import { Component, ElementRef, ViewChild } from '@angular/core';
import { CatagoryResDto, ProductResDto } from '../core/Models/catalog';
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

  @ViewChild('slider') slider!: ElementRef;

  ListCategory: CatagoryResDto[] = [];

  baseImageUrl = 'https://haseebapieshop.runasp.net/Image/';

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.catalogService.getCategories().subscribe(res => {
      if (res.data) {
        this.ListCategory = res.data;
      }
    });
  }

  scrollLeft() {
    this.slider.nativeElement.scrollLeft -= 260;
  }

  scrollRight() {
    this.slider.nativeElement.scrollLeft += 260;
  }
}
