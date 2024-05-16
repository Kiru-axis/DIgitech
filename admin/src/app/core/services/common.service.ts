import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoupon, ICreateCoupon, IEnquiry } from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  enq_url = environment.server_url + '/enquiries';
  coup_url = environment.server_url + '/coupons';

  constructor(private http: HttpClient) {}

  // COUPONS
  getAllCoupons(): Observable<ICoupon[]> {
    return this.http.get<ICoupon[]>(`${this.coup_url}/all`);
  }

  createCoupon(dto: ICreateCoupon): Observable<ICoupon> {
    return this.http.post<ICoupon>(`${this.coup_url}/create`, dto);
  }

  deleteCoupon(couponId: string): Observable<ICoupon> {
    return this.http.delete<ICoupon>(`${this.coup_url}/${couponId}`);
  }

  // ENQUIRIES
  getAllEnquiries(): Observable<IEnquiry[]> {
    return this.http.get<IEnquiry[]>(`${this.enq_url}`);
  }

  deleteEnquiry(enquiryId: string): Observable<IEnquiry> {
    return this.http.delete<IEnquiry>(`${this.enq_url}/${enquiryId}`);
  }
}
