import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IBackendSuccess,
  IColor,
  ICreateReview,
  IProduct,
  IProductCategory,
  IReview,
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

  review_url = environment.server_url + '/reviews';

  constructor(private http: HttpClient) {}

  getAllProducts(query: ProductQueryType): Observable<IProduct[]> {
    const obj = {
      ...(query?.cat && { cat: String(query.cat) }),
      ...(query?.color && { color: String(query.color) }),
      ...(query?.page && { page: String(query.page) }),
      ...(query?.limit && { limit: String(query.limit) }),
      ...(query?.brand && { brand: String(query.brand) }),
      ...(query?.tag && { tag: String(query.tag) }),
      ...(query?.min && { min: String(query.min) }),
      ...(query?.max && { max: String(query.max) }),
      ...(query?.available && { available: String(query.available) }),
    };

    let params = new HttpParams({ fromObject: obj });

    return this.http.get<IProduct[]>(this.url, { params });
  }

  getSingleProduct(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${productId}`);
  }

  getAllProductCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>(this.cat_url);
  }

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.color_url);
  }

  getAllTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.tags_url);
  }

  createReview(dto: ICreateReview): Observable<IReview> {
    return this.http.post<IReview>(this.review_url, dto);
  }

  deleteReview(reviewId: string): Observable<IReview> {
    return this.http.delete<IReview>(`${this.review_url}/${reviewId}`);
  }
}
