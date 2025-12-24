import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResDto, CatagoryResDto, ProductFilter, ProductPaginationRes, ProductResDto } from '../Models/catalog';
import { ResponseDto } from '../Models/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<ResponseDto<CatagoryResDto[]>>('Catalog/category/getall')
  }
  getBrands(){
    return this.http.get<ResponseDto<BrandResDto[]>>('Catalog/brand/getall')
  }
getAllProducts(filter: ProductFilter) {
  return this.http.post<ResponseDto<ProductPaginationRes>>(
    'Catalog/product/getall',
    filter
  );
}


}