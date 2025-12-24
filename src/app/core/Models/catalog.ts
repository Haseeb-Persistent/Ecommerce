import { ImageResDto } from "./image";

export interface CatagoryResDto {
    id: number;
    name: string;
   image: ImageResDto | null;

}

export interface BrandResDto {
    id: number;
    name: string;
    image: ImageResDto | null;
}

export interface ProductResDto {
    id: number;
    name: string;
    description: string;
    OrignalPrice: number;
    discountPercentage: number | null;
    discountAmount: number | null;
    newPrice: number;
    isOnDiscount: boolean;
    stockQuantity: number;
    inStock: boolean;
    avearageRating: number;
    totalReviews: number;
    isFeatured: boolean;
    category: CatagoryResDto;
    brand: BrandResDto;
    thumbnail: ImageResDto | null;
}
export interface Pagination<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

export interface ProductFilter {
  pageIndex: number;
  pageSize: number;
  brandId?: number[];
  categoryId?: number[];
  search?: string;
  ratings?: number[];
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductPaginationRes extends Pagination<ProductResDto> {
  minPrice?: number;
  maxPrice?: number;
}
