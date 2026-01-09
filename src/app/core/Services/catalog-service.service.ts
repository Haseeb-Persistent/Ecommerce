import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResDto, CatagoryResDto, ProductFilter, ProductPaginationRes, ProductResDto } from '../Models/catalog';
import { ResponseDto } from '../Models/ResponseDto';
import { environment } from '../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

constructor(private http:HttpClient) { }

getCategories(){
  return this.http.get<ResponseDto<CatagoryResDto[]>>(
    `${environment.baseApi}Catalog/category/getall`
  );
}

getBrands(){
  return this.http.get<ResponseDto<BrandResDto[]>>(
    `${environment.baseApi}Catalog/brand/getall`
  );
}
  AddCategory(formData: FormData): Observable<any> {
    return this.http.post(`${environment.baseApi}Catalog/category/create`, formData);
  }

AddBrand(formData: FormData): Observable<any> {
  return this.http.post(
    'https://haseebapieshop.runasp.net/api/Catalog/brand/create',
    formData
  );
}
AddProduct(formData: FormData): Observable<any> {
  return this.http.post(
    'https://haseebapieshop.runasp.net/api/Catalog/product/create',
    formData
  );
}



getAllProducts(filter?: ProductFilter) {
  return this.http.post<ResponseDto<ProductPaginationRes>>(
    `${environment.baseApi}Catalog/product/getall`,
    filter ?? {}  
  );
}







}