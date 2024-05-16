import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IBulkDeleteResponse,
  ICart,
  ICompare,
  ICreateCart,
  ICreateCompare,
  ICreateOrder,
  ICreateWishlist,
  IDeleteCartProduct,
  IOrder,
  IUpdateCart,
  IWishlist,
} from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = environment.server_url + '/customer';

  constructor(private http: HttpClient) {}

  // CART
  getUserCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.url}/carts`);
  }

  addToCart(dto: ICreateCart): Observable<ICart> {
    return this.http.post<ICart>(`${this.url}/carts/add`, dto);
  }

  updateCart(dto: IUpdateCart): Observable<ICart> {
    return this.http.put<ICart>(`${this.url}/carts/update`, dto);
  }

  removeProductFromCart(dto: IDeleteCartProduct): Observable<ICart> {
    return this.http.delete<ICart>(`${this.url}/carts/delete`, { body: dto });
  }

  clearCart(): Observable<IBulkDeleteResponse> {
    return this.http.delete<IBulkDeleteResponse>(`${this.url}/carts/clear`);
  }

  // ORDERS
  createOrder(dto?: ICreateOrder): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.url}/orders/create`, dto);
  }

  getUserOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.url}/orders/user-orders`);
  }

  // WISHLISTS
  getWishlist(): Observable<IWishlist[]> {
    return this.http.get<IWishlist[]>(`${this.url}/wishlists`);
  }

  addToWishlist(dto: ICreateWishlist): Observable<IWishlist> {
    return this.http.post<IWishlist>(`${this.url}/wishlists`, dto);
  }

  removeFromWishlist(dto: ICreateWishlist): Observable<IWishlist> {
    return this.http.delete<IWishlist>(`${this.url}/wishlists`, {
      body: { productId: dto.productId },
    });
  }

  clearWishlist(): Observable<IBulkDeleteResponse> {
    return this.http.delete<IBulkDeleteResponse>(`${this.url}/wishlists/clear`);
  }

  // COMPARES
  getCompares(): Observable<ICompare[]> {
    return this.http.get<ICompare[]>(`${this.url}/compares`);
  }

  addToCompares(dto: ICreateCompare): Observable<ICompare> {
    return this.http.post<ICompare>(`${this.url}/compares`, dto);
  }

  removeFromCompares(dto: ICreateCompare): Observable<ICompare> {
    return this.http.delete<ICompare>(`${this.url}/compares`, {
      body: { productId: dto.productId },
    });
  }

  clearCompares(): Observable<IBulkDeleteResponse> {
    return this.http.delete<IBulkDeleteResponse>(`${this.url}/compares/clear`);
  }
}
