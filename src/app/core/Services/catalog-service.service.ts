import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';
import { 
  BrandResDto, 
  CatagoryResDto, 
  ProductFilter, 
  ProductPaginationRes, 
  ProductResDto 
} from '../Models/catalog';
import { ResponseDto } from '../Models/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiUrl = environment.baseApi + 'Catalog';

  constructor(private http: HttpClient) { }

  // ----------------- Categories -----------------
  getCategories(): Observable<ResponseDto<CatagoryResDto[]>> {
    return this.http.get<ResponseDto<CatagoryResDto[]>>(
      `${this.apiUrl}/category/getall`
    );
  }

  addCategory(formData: FormData): Observable<ResponseDto<CatagoryResDto>> {
    return this.http.post<ResponseDto<CatagoryResDto>>(
      `${this.apiUrl}/category/create`,
      formData
    );
  }

  // ----------------- Brands -----------------
  getBrands(): Observable<ResponseDto<BrandResDto[]>> {
    return this.http.get<ResponseDto<BrandResDto[]>>(
      `${this.apiUrl}/brand/getall`
    );
  }

  addBrand(formData: FormData): Observable<ResponseDto<BrandResDto>> {
    return this.http.post<ResponseDto<BrandResDto>>(
      `${this.apiUrl}/brand/create`,
      formData
    );
  }

  // ----------------- Products -----------------
  getAllProducts(filter?: ProductFilter): Observable<ResponseDto<ProductPaginationRes>> {
    return this.http.post<ResponseDto<ProductPaginationRes>>(
      `${this.apiUrl}/product/getall`,
      filter ?? {}
    );
  }

  getProductById(id: number): Observable<ResponseDto<ProductResDto>> {
    return this.http.get<ResponseDto<ProductResDto>>(
      `${this.apiUrl}/product/${id}`
    );
  }

  addProduct(formData: FormData): Observable<ResponseDto<ProductResDto>> {
    return this.http.post<ResponseDto<ProductResDto>>(
      `${this.apiUrl}/product/create`,
      formData
    );
  }

}
