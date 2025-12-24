import { Component, Input } from '@angular/core';
import { ProductResDto } from '../../core/Models/catalog';
import { environment } from '../../core/enviroment/enviroment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  
@Input() product!:ProductResDto;
showMore = false;
showMoreBtn = true;
apiUrl = environment.imageBaseApi;

  getImageUrl(): string {
    if (!this.product?.thumbnail?.imageUrl) {
      return '/assets/no-image.png';
    }

    return (
      this.apiUrl +
      '/' +
      this.product.thumbnail.imageUrl.replace(/\\/g, '/')
    );
  }

  products: ProductResDto[] = [
    {
      id: 1,
      name: 'Red',
      description:
        '',
      OrignalPrice: 1200,
      discountPercentage: 0,
      discountAmount: 0,
      newPrice: 123,
      isOnDiscount: true,
      stockQuantity: 0,
      inStock: true,
      avearageRating: 0,
      totalReviews: 324,
      isFeatured: true,
      category: { id: 1, name: 'Mobiles' } as any,
      brand: { id: 1, name: 'Xiaomi' } as any,
      thumbnail: {
     imageUrl: "image/37330c15-ee59-41cb-940b-35d4b7729168.png",
        id: 2,
        name: 'dsd'
      } 
    }
  ];
  }
