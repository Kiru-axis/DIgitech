import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderResponse, OrderQueryType } from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = environment.server_url + '/customer';

  constructor(private http: HttpClient) {}

  getOrders(query?: OrderQueryType): Observable<IOrderResponse[]> {
    const obj = {
      limit: '',
      page: '',
      min: '',
      max: '',
    };

    if (query) {
      obj.page = String(query.page);
      obj.limit = String(query.limit);
      obj.max = String(query.max);
      obj.min = String(query.min);
    }

    let params = new HttpParams({ fromObject: obj });

    return this.http.get<IOrderResponse[]>(`${this.url}/orders`, { params });
  }
}
