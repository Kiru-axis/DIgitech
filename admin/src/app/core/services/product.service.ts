import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IColor,
  ICreateCommonProductSup,
  ICreateProduct,
  IProduct,
  IProductBrand,
  IProductCategory,
  ITag,
  ProductQueryType,
} from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.server_url + '/products';

  cat_url = environment.server_url + '/categories';

  color_url = environment.server_url + '/colors';

  tags_url = environment.server_url + '/tags';

  brands_url = environment.server_url + '/brands';

  constructor(private http: HttpClient) {}

  getAllProducts(query?: ProductQueryType): Observable<IProduct[]> {
    const obj = {
      cat: '',
      available: '',
      color: '',
      brand: '',
      tag: '',
      min: '',
      max: '',
    };

    if (query) {
      obj.cat = String(query.cat);
      obj.available = String(query.available);
      obj.color = String(query.color);
      obj.brand = String(query.brand);
      obj.tag = String(query.tag);
      obj.max = String(query.max);
      obj.min = String(query.min);
    }

    let params = new HttpParams({ fromObject: obj });
    return this.http.get<IProduct[]>(this.url, { params });
  }

  getSingleProduct(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${productId}`);
  }

  uploadProductImages(productId: string, images: any): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}/upload/${productId}`, images);
  }

  createProduct(dto: ICreateProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, dto);
  }

  updateProduct(
    dto: Partial<IProduct>,
    productId: string
  ): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${productId}`, dto);
  }

  deleteProduct(productId: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${productId}`);
  }

  // TAGS
  getAllTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.tags_url);
  }
  createTag(dto: ICreateCommonProductSup): Observable<ITag> {
    return this.http.post<ITag>(this.tags_url, dto);
  }
  deleteTag(tagId: string): Observable<ITag> {
    return this.http.delete<ITag>(`${this.tags_url}/${tagId}`);
  }

  // COLORS

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.color_url);
  }
  createColor(dto: ICreateCommonProductSup): Observable<IColor> {
    return this.http.post<IColor>(this.color_url, dto);
  }
  deleteColor(colorId: string): Observable<IColor> {
    return this.http.delete<IColor>(`${this.color_url}/${colorId}`);
  }

  // PRODUCT CATEGORIES
  getAllProductCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>(this.cat_url);
  }
  createProductCategory(
    dto: ICreateCommonProductSup
  ): Observable<IProductCategory> {
    return this.http.post<IProductCategory>(this.cat_url, dto);
  }
  deleteProductCategory(catId: string): Observable<IProductCategory> {
    return this.http.delete<IProductCategory>(`${this.cat_url}/${catId}`);
  }

  // BRANDS
  getAllBrands(): Observable<IProductBrand[]> {
    return this.http.get<IProductBrand[]>(this.brands_url);
  }
  createProductBrand(dto: ICreateCommonProductSup): Observable<IProductBrand> {
    return this.http.post<IProductBrand>(this.brands_url, dto);
  }
  deleteProductBrand(catId: string): Observable<IProductBrand> {
    return this.http.delete<IProductBrand>(`${this.brands_url}/${catId}`);
  }
}
