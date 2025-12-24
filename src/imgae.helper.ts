import { Input } from '@angular/core';
import { environment } from './app/core/enviroment/enviroment';
import { ProductResDto } from './app/core/Models/catalog';

export class ProductCardComponent {
  @Input() product!: ProductResDto;
  showMore = false;

  apiUrl = environment.baseApi;

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
}
